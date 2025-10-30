import { Injectable } from "@nestjs/common";
import { Browser, chromium, Page } from "playwright";
import { config } from "../../config/config";

@Injectable()
export class GeneratePdfService {
  private browser!: Browser;
  private page!: Page;

  private desiredWidth = 1920 * 0.75;
  private viewport = {
    width: Math.round(this.desiredWidth),
    height: Math.round(this.desiredWidth * 1.414),
  };

  private async prepare(): Promise<void> {
    this.browser = await chromium.launch({});
    this.page = await this.browser.newPage();
    await this.page.setViewportSize(this.viewport);
  }

  public async execute(token: string, tripId: string): Promise<Buffer> {
    if (!this.page) {
      await this.prepare();
    }
    await this.page.goto(config.frontendUrl);
    const jsonToStore = `{"state":{"token":"${token.split(" ")[1]}"},"version":0}`;
    await this.page.evaluate(
      `localStorage.setItem('token', '${jsonToStore}'); localStorage.setItem('isPrint', 'true');`
    );
    await this.page.goto(`${config.frontendUrl}/trip/${tripId}`, {
      waitUntil: "networkidle",
    });
    return await this.page.pdf({
      height: `${this.viewport.height}px`,
      width: `${this.viewport.width}px`,
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      printBackground: false,
      // format: "A4",
    });
  }
}
