import { Injectable } from "@nestjs/common";
import { Agent, run, webSearchTool } from "@openai/agents";
import z from "zod";
import { Prisma } from "@prisma/client";
import { AIExecutionContext } from "../openai.types";
import { ServerError } from "../../error/server.error";

// Struktura odpowiedzi generowanej przez agenta
// Zawiera listę kontrolną przygotowań do podróży wraz z orientacyjnymi kosztami

const agentOutputSchema = z.object({
  controlList: z.array(
    z.object({
      name: z.string(), // nazwa elementu (np. zrobić wizę)
      cost: z.number(), // koszty
      description: z.string(), // opis
    })
  ),
});

// Typ danych automatycznie generowany na podstawie schematu odpowiedzi agenta

type AgentOutput = z.output<typeof agentOutputSchema>;

@Injectable()
export class ControlListCreatorAgent {
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
    // Określana jest nazwa agenta, używany model językowy oraz instrukcje opisujące jego rolę i sposób generowania kontrolnej listy rzeczy i wydatków
    // na podstawie danych o podróży
    // Format danych wyjściowych jest walidowany za pomocą schematu Zod

    this.agent = new Agent({
      name: "control list and budget creator",
      model: "gpt-5",
      instructions:
        "You are an agent that searches based on home address and destination addresses" +
        "what necessary things user should prepare or took with themselves and how much it may cost." +
        "Be brief. Don't ask any questions afterwards, just give the recommendations and that's it." +
        "Provide the answer without mentioning any sources, citations, references, footnotes, or any citation markers (e.g. brackets, IDs, links).",
      tools: [webSearchTool()],
      outputType: agentOutputSchema,
    });
  }

  // Publiczna metoda do generowania kontrolnej listy rzeczy i wydatków

  public async execute(
    trip: Prisma.TripGetPayload<{
      include: { tripPoints: true; user: true };
    }>
  ): Promise<AgentOutput> {
    // Przygotowanie listy odwiedzanych miejsc na podstawie punktów trasy

    const places = trip.tripPoints.map((point) => {
      return `${point.city}, ${point.fullAddress}`;
    });

    // Pobranie zainteresowań użytkownika w celu personalizacji rekomendacji

    const preferences = trip.user.tripInterest.join(", ");

    // Uruchomienie agenta AI za pomocą domyślnej instancji Runner
    // Przekazywana jest instancja agenta, prompt zawierały informację o kraju użytkownika, planowanych miejscach,
    // zainteresowaniach oraz preferowanej walucie wraz z maksymalną liczbą iteracji generowania odpowiedzi

    const result = await run(
      this.agent,
      `My current country is ${trip.user.country}. There is the list of cities and main places, which I want to visit: ${places.join(", ")}. ` +
        "Tell me what I have to take care of, where I can stay, which stuff I can take with me and so on." +
        `Also pay attention to my interests: ${preferences} and preferred currency: ${trip.user.currency}. Make this brief, but meaningful.`,
      {
        maxTurns: 5,
      }
    );

    // W przypadku braku wygenerowanej odpowiedzi zwracany jest błąd serwera

    if (!result.finalOutput) {
      throw new ServerError("Control list generation failed");
    }

    // Zwrócenie listy kontrolnej oraz kosztów

    return result.finalOutput;
  }
}
