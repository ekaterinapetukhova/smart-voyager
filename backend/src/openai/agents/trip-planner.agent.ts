import { Injectable } from "@nestjs/common";
import { Agent, run, webSearchTool } from "@openai/agents";
import { z } from "zod";
import { z as zv4 } from "zod/v4";
import { VerifyPlaceTool } from "../tools/verify-place.tool";
import { AIExecutionContext } from "../openai.types";
import { CreateTripDto } from "../../trip/dto/create-trip.dto";
import { GeoapifyAutocompleteService } from "../../geoapify/service/geoapify-autocomplete.service";
import { ServerError } from "../../error/server.error";

// Walidator danych wejściowych przekazywanych przez użytkownika
// Dane muszą być typu string i zawierać co najmniej jeden znak

export const tripPlannerInputSchema = zv4.object({
  content: zv4.string().min(1, "Your trip description must have at least one symbol"),
});

// Typ danych automatycznie generowany na podstawie schematu walidacji

export type TripPlannerInput = zv4.output<typeof tripPlannerInputSchema>;

// Struktura odpowiedzi generowanej przez agenta
// Obejmuje nazwę trasy, jej opis oraz listę miejsc do odwiedzenia, z których każde zawiera nazwę miejsca, miasto oraz kraj
// Wszystkie dane są typu string

const tripPlannerOutputSchema = z.object({
  name: z.string(), // nazwa trasy
  description: z.string(), // opis trasy
  // lista miejsc
  placesToVisit: z.array(
    z.object({
      name: z.string(), // nazwa miejsca
      city: z.string(), // miasto
      country: z.string(), // kraj
    })
  ),
});

// Typ danych automatycznie generowany na podstawie schematu odpowiedzi agenta

export type TripPlannerOutput = z.output<typeof tripPlannerOutputSchema>;

@Injectable()
export class TripPlannerAgent {
  // Instancja agenta sztucznej inteligencji odpowiedzialnego za generowanie planu podróży
  // Typ generyczny Agent określa kontekst wykonania agent oraz strukturę danych zwracanych w odpowiedzi.
  // AIExecutionContext definiuje dane kontekstowe dostępne dla agenta:
  //
  // interface AIExecutionContext {
  //   userId: string;
  // }

  private readonly agent: Agent<AIExecutionContext, typeof tripPlannerOutputSchema>;

  public constructor(
    // Serwisy przekazywane do konstruktora za pomocą mechanizmu Dependency Injection w Nest.js

    private readonly geoapifyAutocompleteService: GeoapifyAutocompleteService, // Serwis do formatowania danych geolokalizacyjnych
    verifyPlaceTool: VerifyPlaceTool // Narzędzie do weryfikacji istnienia miejsc
  ) {
    // Inicjalizacja agenta AI wraz z jego konfiguracją
    // Określana jest nazwa agenta, używany model językowy oraz instrukcje opisujące jego rolę i sposób generowania planu podróży
    // Agent korzysta z dodatkowych narzędzi w celu zwiększenia dokładności i wiarygodności odpowiedzi
    // Format danych wyjściowych jest walidowany za pomocą schematu Zod

    this.agent = new Agent<AIExecutionContext, typeof tripPlannerOutputSchema>({
      name: "trip planner",
      model: "gpt-5",
      instructions:
        "you are an agent that provides exciting and interesting trips for user mainly focused " +
        "on the places and returns the trip." +
        "You must save the trip, briefly describe it and verify all provided places exist before including them into " +
        "final list. Also check if this place is still working and opinions about it." +
        "Aim for maximum 10 places (minimum must be 2 places), best aim for between 4 and 7." +
        "Don't include the information about place existing." +
        "Provide the answer without mentioning any sources, citations, references, footnotes, or any citation markers (e.g. brackets, IDs, links).",
      tools: [webSearchTool(), verifyPlaceTool.getTool()],
      modelSettings: {
        toolChoice: "required",
      },
      outputType: tripPlannerOutputSchema,
    });
  }

  // Publiczna metoda do generowania trasy

  public async execute(data: TripPlannerInput, userId: string): Promise<CreateTripDto> {
    // Uruchomienie agenta AI za pomocą domyślnej instancji Runner
    // Przekazywana jest instancja agenta, dane wejściowe od użytkownika
    // oraz kontekst wykonania zawierający identyfikator użytkownika i maksymalną liczbę iteracji generowania odpowiedzi

    const result = await run(this.agent, data.content, {
      context: {
        userId,
      } satisfies AIExecutionContext,
      maxTurns: 25,
    });

    // Wynik wygenerowany przez agenta

    const initialTrip = result.finalOutput;

    // W przypadku braku wygenerowanej odpowiedzi zwracany jest błąd serwera

    if (!initialTrip) {
      throw new ServerError("Generating trip failed");
    }

    // Przetworzenie i zwrócenie wygenerowanej trasy
    return await this.preprocessTrip(initialTrip);
  }

  // Prywatna metoda do przetworzenia i uzupełnienie danych wygenerowanych przez agenta

  private async preprocessTrip(response: TripPlannerOutput): Promise<CreateTripDto> {
    const tripPoints = await Promise.all(
      response.placesToVisit.map(async (place) => {
        try {
          // Pobranie danych geolokalizacyjnych dla wskazanego miejsca

          const { lat, lng, fullAddress } = await this.geoapifyAutocompleteService.execute(
            `${place.name}, ${place.city}, ${place.country}`
          );

          // Zwrócenie sformatowanych danych punktu trasy

          return {
            latitude: lat,
            longitude: lng,
            name: place.name,
            fullAddress: fullAddress,
            city: place.city,
            country: place.country,
          };
        } catch {
          // W przypadku niepowodzenia miejsce jest pomijane

          return null;
        }
      })
    );

    return {
      tripPoints: tripPoints.filter((x) => !!x), // lista tylko istniejących miejsc
      name: `${response.name} [AI]`, // nazwa trasy
      isProposal: true, // flaga czy jest to propozycja od AI
      description: response.description, // opis trasy
    };
  }
}
