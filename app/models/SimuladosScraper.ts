import { Browser, chromium, Page } from 'playwright';
import { MaterialPage } from './MaterialPage';

class SimuladosScraper {
  private browser!: Browser;

  constructor() {}

  async init() {
    this.browser = await chromium.launch({ headless: false });
  }

  async scrapeSimulados(url: string) {
    const page = await this.browser.newPage();
    await page.goto(url);

    const simuladosIndex = await page
      .locator('ul[class=link-d]')
      .locator('li')
      .all();

    const materialPage = new MaterialPage(page);

    for (const simulado of simuladosIndex) {
      await materialPage.clickMaterial(simulado);

      const provas = await page.locator('div[class=header-ver-prova]').all();

      for (const prova of provas) {
        await prova.click();
        await page.waitForLoadState('load');
        await materialPage.downloadPDFs();
        // await materialPage.goBack();
      }

      await page.goBack();
      await page.waitForLoadState('load');
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

export { SimuladosScraper };
