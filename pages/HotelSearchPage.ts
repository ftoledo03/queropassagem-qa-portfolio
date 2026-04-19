import { Page } from '@playwright/test';
import { hotelSearchSelectors as s } from '../selectors/hotelSearchSelectors';

export class HotelSearchPage {
  constructor(public page: Page) {}

  async goto() {
    await this.page.goto('/hoteis/');
  }

async fillDestination(destination: string) {
  await this.page.getByRole(s.destinationInput.role, { name: s.destinationInput.name }).click();
  await this.page.getByRole(s.destinationInput.role, { name: s.destinationInput.name }).fill(destination);
  await this.page.waitForTimeout(2000);
  await this.page.getByRole('listitem').filter({ hasText: destination }).first().click();
  
  // Troca mouse.click(0,0) por isso
  await this.page.getByRole('heading', { name: 'Hotéis mais baratos' }).click();
  await this.page.waitForTimeout(500);
}

async clickFirstVerQuartos() {
  await this.page.waitForSelector(s.viewRoomsButton, { state: 'visible' });
  const newPagePromise = this.page.context().waitForEvent('page');
  await this.page.locator(s.viewRoomsButton).first().click();
  const newPage = await newPagePromise;
  await newPage.waitForLoadState('load');
  console.log('Nova aba URL:', newPage.url());
  this.page = newPage;
}

async searchHotel(destination: string) {
  await this.fillDestination(destination);
  
  await this.page.locator('label[for="dt-checkout"]').click();
  await this.page.waitForTimeout(500);

  await this.page.getByRole(s.searchButton.role, { name: s.searchButton.name }).click();
  await this.page.waitForURL(/hoteis\/busca|sao-paulo/, { timeout: 15000 });
}
}

/////


