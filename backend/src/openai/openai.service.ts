import { Injectable } from "@nestjs/common";
import { Agent, run, tool } from "@openai/agents";
import z from "zod";

interface AIExecutionContext {
  userId: string;
}

@Injectable()
export class OpenAIService {
  // private openai: OpenAI;
  private agent: Agent;

  public constructor() {
    // const mcpServer = new MCPServerStreamableHttp({
    //   url: "http://192.168.1.215:3333/mcp",
    //   name: "test",
    //   // authProvider:
    // });
    //
    // void mcpServer.connect().catch(console.error);

    const getCurrentTimeTool = tool({
      name: "get_current_time",
      description: "get the current time",
      parameters: z.object({}),
      execute: async ({}, context: AIExecutionContext) => {
        console.log("Getting current time", context);

        return new Date().toISOString();
      },
    });

    this.agent = new Agent({
      name: "test",
      instructions: "you are agent that provides time",
      // mcpServers: [mcpServer],
      tools: [getCurrentTimeTool],
    });
  }

  public async doSmth(): Promise<string | undefined> {
    const result = await run(this.agent, "what is the current time?", {
      context: {
        userId: "bla",
      } satisfies AIExecutionContext,
      maxTurns: 5,
    });

    return result.finalOutput;
  }
}
