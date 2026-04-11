import { test, expect } from '@playwright/test';
import { HotelSearchPage } from '../pages/HotelSearchPage';
import { HotelRoomsPage } from '../pages/HotelRoomsPage';

test.describe('Busca de Hotéis - Quero Passagem', () => {
  test.describe.configure({ mode: 'serial' });

  test('Deve realizar uma busca válida de hotel', async ({ page }) => {
    const hotelSearch = new HotelSearchPage(page);

    await hotelSearch.goto();
    await hotelSearch.searchHotel('São Paulo');

    await expect(page).toHaveURL(/sao-paulo-sp/);
    await expect(page.getByRole('heading', { name: /propriedades/ })).toBeVisible();
  });

  test('Deve clicar em Ver Quartos do primeiro hotel', async ({ page }) => {
    const hotelSearch = new HotelSearchPage(page);

    await hotelSearch.goto();
    await hotelSearch.searchHotel('São Paulo');
    await hotelSearch.clickFirstVerQuartos();

    await expect(hotelSearch.page).toHaveURL(/hoteis\/busca\/sao-paulo-sp/);
  });

  test('Deve selecionar o primeiro quarto disponível', async ({ page }) => {
    const hotelSearch = new HotelSearchPage(page);

    await hotelSearch.goto();
    await hotelSearch.searchHotel('São Paulo');
    await hotelSearch.clickFirstVerQuartos();

    const hotelRooms = new HotelRoomsPage(hotelSearch.page);
    await hotelRooms.clickFirstSelecionar();

    await expect(hotelSearch.page).toHaveURL(/pagamento|checkout/);
  });

});