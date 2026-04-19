import { Page } from '@playwright/test';
import { hotelSearchSelectors as s } from '../selectors/hotelSearchSelectors';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillDadosHospede(hospedes: { nome: string; cpf: string }[]) {
    await this.page.waitForSelector(s.guestName, { timeout: 60000 });

    const fecharModal = this.page.locator('button[aria-label="Close"], button.close, [class*="close"]').first();
    if (await fecharModal.isVisible({ timeout: 3000 }).catch(() => false)) {
      await fecharModal.click();
    }

    const nomeCampos = this.page.locator(s.guestName);
    const cpfCampos = this.page.locator(s.guestCpf);

    for (let i = 0; i < hospedes.length; i++) {
      await nomeCampos.nth(i).fill(hospedes[i].nome);
      await cpfCampos.nth(i).fill(hospedes[i].cpf);
    }

    await this.page.locator(s.guestCopyDataCheckbox).check();
  }

  async fillDadosComprador(email: string, telefone: string) {
    await this.page.locator(s.buyerEmail).fill(email);
    await this.page.locator(s.buyerConfirmEmail).fill(email);
    await this.page.locator(s.buyerPhone).fill(telefone);
  }

  async fillEndereco(cep: string, logradouro: string, numero: string, complemento: string, bairro: string) {
    await this.page.locator(s.addressZipCode).fill(cep);
    await this.page.waitForTimeout(3000);
    await this.page.locator(s.addressStreet).fill(logradouro);
    await this.page.locator(s.addressNumber).fill(numero);
    await this.page.locator(s.addressComplement).fill(complemento);
    await this.page.locator(s.addressNeighborhood).fill(bairro);
  }

  async fillDadosCartao(numero: string, nome: string, validade: string, cvv: string) {
    await this.page.locator(s.paymentCardNumber).fill(numero);
    await this.page.locator(s.paymentCardName).fill(nome);
    await this.page.locator(s.paymentCardExpiry).fill(validade);
    await this.page.locator(s.paymentCardCvv).fill(cvv);
  }

  async selectCartaoCredito() {
    await this.page.locator(s.paymentCreditCard).click();
  }
}