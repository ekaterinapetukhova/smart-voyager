import { Injectable } from "@nestjs/common";
import { config } from "../../config/config";
import { ServerError } from "../../error/server.error";

@Injectable()
export class GeoapifyApiClient {
  public async sendRequest<Input extends object, Output extends object>(path: string, input: Input): Promise<Output> {
    const urlSearchParams = new URLSearchParams({ ...input, apiKey: config.geoapifyKey });
    const fullUrl = `${config.geoapifyUrl}/${path}?${urlSearchParams}`;

    console.log(fullUrl);

    const response = await fetch(fullUrl);

    if (!response.ok) {
      console.error(await response.text());
      console.error(response.statusText);
      throw new ServerError("GeoapifyApiClient failed");
    }

    return (await response.json()) as Output;
  }
}
