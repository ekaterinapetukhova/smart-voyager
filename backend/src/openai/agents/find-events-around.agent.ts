import { Injectable } from "@nestjs/common";
import { Agent, run, webSearchTool } from "@openai/agents";
import z from "zod";
import { Prisma } from "@prisma/client";
import { AIExecutionContext } from "../openai.types";
import { ServerError } from "../../error/server.error";

// Struktura odpowiedzi generowanej przez agenta
// Zawiera listę wydarzeń odbywających się w pobliżu planowanych miejsc podróży

const agentOutputSchema = z.object({
  events: z.array(
    z.object({
      name: z.string(), // nazwa wydarzenia
      place: z.string(), // miejsce odbywania się
      date: z.string().describe("ISO date time"), // data wydarzenia w formacie ISO
      city: z.string(), // miasto, w którym odbywa się wydarzenie
    })
  ),
});

// Typ danych automatycznie generowany na podstawie schematu odpowiedzi agenta

export type FindEventsAroundAgentOutput = z.output<typeof agentOutputSchema>;

@Injectable()
export class FindEventsAroundAgent {
  // Instancja agenta sztucznej inteligencji odpowiedzialnego za generowanie planu podróży
  // Typ generyczny Agent określa kontekst wykonania agent oraz strukturę danych zwracanych w odpowiedzi.
  // AIExecutionContext definiuje dane kontekstowe dostępne dla agenta:
  //
  // interface AIExecutionContext {
  //   userId: string;
  // }

  private readonly agent: Agent<AIExecutionContext, typeof agentOutputSchema>;

  public constructor() {
    // Inicjalizacja agenta AI wraz z jego konfiguracją
    // Określana jest nazwa agenta, używany model językowy oraz instrukcje opisujące jego rolę i sposób wyszukiwanie wydarzeń
    // na podstawie miejsc i periodu wycieczki
    // Format danych wyjściowych jest walidowany za pomocą schematu Zod

    this.agent = new Agent({
      name: "events finder",
      model: "gpt-5",
      instructions:
        "You are an agent that searches the web based on an address given and date range and finds " +
        "possible events with the near vicinity of the place the user can go to, visit, attend, and so on. " +
        "Be brief. Don't ask any questions afterwards, just give the recommendations and that's it. Translate all data into english." +
        "Propose at least one event." +
        "Provide the answer without mentioning any sources, citations, references, footnotes, or any citation markers (e.g. brackets, IDs, links).",
      tools: [webSearchTool()],
      outputType: agentOutputSchema,
    });
  }

  // Publiczna metoda do wyszukiwania wydarzeń

  public async execute(
    trip: Prisma.TripGetPayload<{
      include: { tripPoints: true; user: true; event: true };
    }>
  ): Promise<FindEventsAroundAgentOutput> {
    // Przygotowanie listy lokalizacji na podstawie punktów trasy

    const places = trip.tripPoints.map((point) => {
      return `${point.city}, ${point.fullAddress}`;
    });

    // Uruchomienie agenta AI za pomocą domyślnej instancji Runner
    // Przekazywana jest instancja agenta, prompt zawierały informację o czasie podróży oraz miejscach trasy
    //  wraz z maksymalną liczbą iteracji generowania odpowiedzi

    const result = await run(
      this.agent,
      "Find events to attend, visit, go to, between date" +
        `from ${trip.event?.from.toDateString()} and to ${trip.event?.to.toDateString()} and near those places: ${places.join(", ")}`,
      {
        maxTurns: 5,
      }
    );

    // W przypadku braku wygenerowanej odpowiedzi zwracany jest błąd serwera

    if (!result.finalOutput) {
      throw new ServerError("Events around generation failed");
    }

    console.log(result.finalOutput);

    // Zwrócenie listy wydarzeń

    return result.finalOutput;
  }
}
