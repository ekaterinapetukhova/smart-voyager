import { INestApplication } from "@nestjs/common";
import { FindEventsAroundAgent } from "../src/openai/agents/find-events-around.agent";
import { ControlListCreatorAgent } from "../src/openai/agents/control-list-creator.agent";
import { initTestApp } from "./init-test-app";

describe("files", () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await initTestApp();
  });

  it(
    "test",
    async () => {
      const service = app.get(FindEventsAroundAgent);

      const result = await service.execute("Katowice, Poland", new Date(), new Date());

      console.log(result);
    },
    1200 * 1000
  );

  it(
    "test1",
    async () => {
      const service = app.get(ControlListCreatorAgent);

      const result = await service.execute("df488f29-fcd7-42d5-bd3f-7312f9cad3ef");

      console.log(result);
    },
    1200 * 1000
  );
});
