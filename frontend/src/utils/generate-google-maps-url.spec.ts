import { describe, it } from "vitest";
import { generateGoogleMapsNavigationUrl } from "./generate-google-maps-url.ts";

describe("Google Maps Navigation Url", () => {
  it("should generate google-maps navigation url", () => {
    const params = {
      origin: "Katowice",
      destination: "Kraków",
    };
    const link = generateGoogleMapsNavigationUrl(params);

    console.log(link);
  });
});
