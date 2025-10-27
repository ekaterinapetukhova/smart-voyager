import { Injectable } from "@nestjs/common";
import { Agent, run, webSearchTool } from "@openai/agents";
import z from "zod";
import { AIExecutionContext } from "../openai.types";

const agentOutputSchema = z.object({
  events: z.array(
    z.object({
      name: z.string(),
      place: z.string(),
      dateTime: z.string(),
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
  public async execute(fullAddress: string, from: Date, to: Date): Promise<FindEventsAroundAgentOutput> {
    const result = await run(
      this.agent,
      "Find events to attend, visit, go to, between date" +
        `from ${from.toDateString()} and to ${to.toDateString()} and address ${fullAddress}`,
      {
        maxTurns: 5,
      }
    );

    return result.finalOutput ?? { events: [] };
  }
}
