import { Injectable } from "@nestjs/common";
import { FunctionTool, tool } from "@openai/agents";
import z from "zod";
import { AIExecutionContext } from "../openai.types";
import { GeoapifyAutocompleteService } from "../../geoapify/service/geoapify-autocomplete.service";

const toolInputSchema = z.object({
  name: z.string(),
  city: z.string(),
  country: z.string(),
});

@Injectable()
export class VerifyPlaceTool {
  public readonly verifyPlaceTool: FunctionTool<AIExecutionContext, typeof toolInputSchema>;

  public constructor(private readonly geoapifyAutocompleteService: GeoapifyAutocompleteService) {
    this.verifyPlaceTool = tool<typeof toolInputSchema, AIExecutionContext, string>({
      name: "verify_place",
      description: "verify if place exists",
      parameters: toolInputSchema,
      execute: async (place) => {
        console.log("verifying place", place);

        try {
          await this.geoapifyAutocompleteService.execute(`${place.name}, ${place.city}, ${place.country}`);

          console.log("place exists");

          return "place exists";
        } catch {
          console.log("place does not exist");

          return "place does not exist";
        }
      },
    });
  }

  public getTool(): typeof this.verifyPlaceTool {
    return this.verifyPlaceTool;
  }
}
