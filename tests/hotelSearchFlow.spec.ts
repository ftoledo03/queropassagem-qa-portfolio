import { test, expect } from '@playwright/test';
import { HotelSearchPage } from '../pages/HotelSearchPage';
import { HotelRoomsPage } from '../pages/HotelRoomsPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Fluxo completo - Busca e Seleção de Hotel', () => {

  test('Fluxo de ponta a ponta: busca, quartos e seleção', async ({ page }) => {
    //test.setTimeout(120000); // 2 minutos 
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
      await hotelSearch.page.waitForTimeout(2000);
    });

    await test.step('Deve selecionar o primeiro quarto disponível', async () => {
      const hotelRooms = new HotelRoomsPage(hotelSearch);
      await hotelRooms.clickFirstSelecionar();
      await hotelSearch.page.waitForTimeout(2000);
    });

    await test.step('Deve clicar em Reservar', async () => {
      const hotelRooms = new HotelRoomsPage(hotelSearch);
      await hotelRooms.clickReservar();

      await expect(hotelSearch.page).toHaveURL(/pagamento|checkout/);
      await hotelSearch.page.waitForTimeout(2000);
    });

    await test.step('Deve preencher os dados do checkout', async () => {
      const checkout = new CheckoutPage(hotelSearch.page);

      await checkout.fillDadosHospede([
        { nome: 'Jorge Toledo', cpf: '723.414.540-03' },
        { nome: 'Felipe Toledo', cpf: '987.654.321-00' },
      ]);
      await checkout.fillDadosComprador('jftoledoqa@gmail.com', '(35) 98722-3268');
      await checkout.selectCartaoCredito();
      await checkout.fillEndereco('37245-000', 'Rua A', '1', 'Casa', 'Centro');
      await checkout.fillDadosCartao('5406 6106 6449 3694', 'JORGE F TOLEDO', '11/27', '950');

      await expect(hotelSearch.page.locator('input[formcontrolname="email"]')).toHaveValue('jftoledoqa@gmail.com');
    });

  });

});