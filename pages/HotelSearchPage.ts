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
    await this.page.keyboard.press('ArrowDown');
    await this.page.waitForTimeout(500);
    await this.page.keyboard.press('Enter');
  }

  async clickFirstVerQuartos() {
  await this.page.waitForSelector(s.verQuartosButton);
  const [newPage] = await Promise.all([
    this.page.context().waitForEvent('page'),
    this.page.locator(s.verQuartosButton).first().click(),
  ]);
  await newPage.waitForLoadState('load');
  this.page = newPage;
}

  async searchHotel(destination: string) {
    await this.fillDestination(destination);
    await this.page.waitForURL(/hoteis\/busca|sao-paulo/, { timeout: 10000 });
  }
}