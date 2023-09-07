import { SimuladosScraper } from './SimuladosScraper';

(async () => {
  const scraper = new SimuladosScraper();

  try {
    await scraper.init();
    const url = 'https://www.pciconcursos.com.br/simulados/';
    await scraper.scrapeSimulados(url);
  } catch (error) {
    console.error('Erro durante a raspagem:', error);
  } finally {
    await scraper.close();
  }
})();
