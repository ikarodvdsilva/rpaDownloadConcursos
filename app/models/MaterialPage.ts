import { Page, Locator } from 'playwright';
import * as path from 'path';

class MaterialPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickMaterial(materia: Locator) {
    await materia.click();
    await this.page.waitForLoadState('load');
  }

  async downloadPDFs() {
    const [newPage] = await Promise.all([this.page.waitForEvent('popup')]);
    await newPage.waitForLoadState('load');

    const pdfDownload = await newPage
      .locator('ul[class=pdf_download]')
      .locator('li')
      .all();

    for (const pdf of pdfDownload) {
      await newPage.waitForLoadState('load');
      const downloadPromise = newPage.waitForEvent('download');
      await pdf.click();
      const download = await downloadPromise;
      await download.saveAs(
        path.join('../provas', download.suggestedFilename())
      );
    }

    await newPage.close();
  }

  async goBack() {
    await this.page.goBack();
    await this.page.waitForLoadState('load');
  }
}

export { MaterialPage };
