import { Page } from '@playwright/test';
import { hotelSearchSelectors as s } from '../selectors/hotelSearchSelectors';

export class HotelRoomsPage {
  constructor(private page: Page) {}

  async clickFirstSelecionar() {
  await this.page.getByRole(s.selecionarButton.role, { name: s.selecionarButton.name }).first().click();
  
  const continuar = this.page.getByRole('button', { name: 'CONTINUAR' });
  if (await continuar.isVisible()) {
    await continuar.click();
  }
}

  async clickReservar() {
  await this.page.locator('#dadosReserva').getByRole(s.reservarButton.role, { name: s.reservarButton.name }).click();
  
  const continuar = this.page.locator('button.continuar');
  if (await continuar.isVisible({ timeout: 5000 }).catch(() => false)) {
    await continuar.click();
  }

  await this.page.waitForURL(/pagamento|checkout/, { timeout: 60000 });
}
}