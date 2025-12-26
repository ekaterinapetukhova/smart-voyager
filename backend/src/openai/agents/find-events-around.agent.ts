import { Injectable } from "@nestjs/common";
import { Agent, run, webSearchTool } from "@openai/agents";
import z from "zod";
import { Prisma } from "@prisma/client";
import { AIExecutionContext } from "../openai.types";

const agentOutputSchema = z.object({
  events: z.array(
    z.object({
      name: z.string(),
      place: z.string(),
      date: z.date(),
      city: z.string(),
    })
  ),
});

export type FindEventsAroundAgentOutput = z.output<typeof agentOutputSchema>;

@Injectable()
export class FindEventsAroundAgent {
  private readonly agent: Agent<AIExecutionContext, typeof agentOutputSchema>;

  public constructor() {
    this.agent = new Agent({
      name: "events finder",
      model: "gpt-5-nano",
      instructions:
        "You are an agent that searches the web based on an address given and date range and finds " +
        "possible events with the near vicinity of the place the user can go to, visit, attend, and so on. " +
        "Be brief. Don't ask any questions afterwards, just give the recommendations and that's it.",
      tools: [webSearchTool()],
      outputType: agentOutputSchema,
    });
  }

  // in future, user preferences too
  public async execute(
    trip: Prisma.TripGetPayload<{
      include: { tripPoints: true; user: true; event: true };
    }>
  ): Promise<FindEventsAroundAgentOutput> {
    const places = trip.tripPoints.map((point) => {
      return `${point.city}, ${point.fullAddress}`;
    });

    const result = await run(
      this.agent,
      "Find events to attend, visit, go to, between date" +
        `from ${trip.event?.from.toDateString()} and to ${trip.event?.to.toDateString()} and and places ${places.join(";")}`,
      {
        maxTurns: 5,
      }
    );

    console.log(result.finalOutput);

    return result.finalOutput ?? { events: [] };
  }
}
