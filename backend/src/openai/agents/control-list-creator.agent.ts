import { Injectable } from "@nestjs/common";
import { Agent, run, webSearchTool } from "@openai/agents";
import z from "zod";
import { Prisma } from "@prisma/client";
import { AIExecutionContext } from "../openai.types";
import { ServerError } from "../../error/server.error";

const agentOutputSchema = z.object({
  controlList: z.array(
    z.object({
      name: z.string(),
      cost: z.number(),
      description: z.string(),
    })
  ),
});

type AgentOutput = z.output<typeof agentOutputSchema>;

@Injectable()
export class ControlListCreatorAgent {
  private readonly agent: Agent<AIExecutionContext, typeof agentOutputSchema>;

  public constructor() {
    this.agent = new Agent({
      name: "control list and budget creator",
      model: "gpt-5-nano",
      instructions:
        "You are an agent that searches based on home address and destination addresses" +
        "what necessary things user should prepare or took with themselves and how much it may cost." +
        "Be brief. Don't ask any questions afterwards, just give the recommendations and that's it." +
        "Provide the answer without mentioning sources, citations, references, footnotes, or any citation markers (e.g. brackets, IDs, links).",
      tools: [webSearchTool()],
      outputType: agentOutputSchema,
    });
  }

  public async execute(
    trip: Prisma.TripGetPayload<{
      include: { tripPoints: true; user: true };
    }>
  ): Promise<AgentOutput> {
    const places = trip.tripPoints.map((point) => {
      return `${point.city}, ${point.fullAddress}`;
    });

    const preferences = trip.user.tripInterest.join(", ");

    const result = await run(
      this.agent,
      `My current country is ${trip.user.country}. There is the list of cities and main places, which I want to visit: ${places.join(", ")}. ` +
        "Tell me what I have to take care of, where I can stay, which stuff I can take with me and so on." +
        `Also pay attention to my interests: ${preferences} and preferred currency: ${trip.user.currency}. Make this brief, but meaningful.`,
      {
        maxTurns: 5,
      }
    );

    if (!result.finalOutput) {
      throw new ServerError("Control list generation failed");
    }

    return result.finalOutput;
  }
}
