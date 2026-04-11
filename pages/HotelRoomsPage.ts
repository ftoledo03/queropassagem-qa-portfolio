import { Page } from '@playwright/test';
import { hotelSearchSelectors as s } from '../selectors/hotelSearchSelectors';

export class HotelRoomsPage {
  constructor(private page: Page) {}

  async clickFirstSelecionar() {
    await this.page.waitForSelector('button.selected-btn');
    await this.page.getByRole(s.selecionarButton.role, { name: s.selecionarButton.name }).first().click();
  }
}