import { test, expect } from '@playwright/test';
import { HotelSearchPage } from '../pages/HotelSearchPage';
import { HotelRoomsPage } from '../pages/HotelRoomsPage';

test.describe('Busca de Hotéis - Quero Passagem', () => {

  test('Fluxo completo de busca e seleção de hotel', async ({ page }) => {
    const hotelSearch = new HotelSearchPage(page);

    await test.step('Deve realizar uma busca válida de hotel', async () => {
      await hotelSearch.goto();
      await hotelSearch.searchHotel('São Paulo');

      await expect(page).toHaveURL(/sao-paulo-sp/);
      await expect(page.getByRole('heading', { name: /propriedades/ })).toBeVisible();
    });

    await test.step('Deve clicar em Ver Quartos do primeiro hotel', async () => {
      await hotelSearch.clickFirstVerQuartos();

      await expect(hotelSearch.page).toHaveURL(/hoteis\/busca\/sao-paulo-sp/);
    });

    await test.step('Deve selecionar o primeiro quarto disponível', async () => {
      const hotelRooms = new HotelRoomsPage(hotelSearch.page);
      await hotelRooms.clickFirstSelecionar();

      await expect(hotelSearch.page).toHaveURL(/pagamento|checkout/);
    });

  });

});