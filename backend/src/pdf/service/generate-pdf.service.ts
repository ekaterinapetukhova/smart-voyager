import { Injectable } from "@nestjs/common";
import { Browser, chromium, Page } from "playwright";
import { config } from "../../config/config";

@Injectable()
export class GeneratePdfService {
  private browser!: Browser;
  private page!: Page;

  private async prepare(): Promise<void> {
    this.browser = await chromium.launch({});
    this.page = await this.browser.newPage();
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
      scale: 0.6,
    });
  }
}
