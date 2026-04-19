import { Page } from '@playwright/test';
import { hotelSearchSelectors as s } from '../selectors/hotelSearchSelectors';
import { HotelSearchPage } from './HotelSearchPage';

export class HotelRoomsPage {
  constructor(private hotelSearch: HotelSearchPage) {}

  get page(): Page {
    return this.hotelSearch.page;
  }

  async clickFirstSelecionar() {
    await this.page.getByRole(s.selectRoomButton.role, { name: s.selectRoomButton.name }).first().click();

    const continuar = this.page.getByRole('button', { name: 'CONTINUAR' });
    if (await continuar.isVisible({ timeout: 3000 }).catch(() => false)) {
      await continuar.click();
    }
  }

  async clickReservar() {
    await this.page.locator('#dadosReserva').getByRole(s.bookRoomButton.role, { name: s.bookRoomButton.name }).click();

    const continuar = this.page.locator('button.continuar');
    if (await continuar.isVisible({ timeout: 5000 }).catch(() => false)) {
      await continuar.click();
    }

    await this.page.waitForURL(/pagamento|checkout/, { timeout: 60000 });
  }
}