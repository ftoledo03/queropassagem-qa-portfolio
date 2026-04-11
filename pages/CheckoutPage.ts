import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillDadosHospede(hospedes: { nome: string; cpf: string }[]) {
  await this.page.waitForSelector('input[formcontrolname="nome"]', { timeout: 60000 });

  const fecharModal = this.page.locator('button[aria-label="Close"], button.close, [class*="close"]').first();
  if (await fecharModal.isVisible({ timeout: 3000 }).catch(() => false)) {
    await fecharModal.click();
  }

  const nomeCampos = this.page.locator('input[formcontrolname="nome"]');
  const cpfCampos = this.page.locator('input[formcontrolname="cpf"]');

  for (let i = 0; i < hospedes.length; i++) {
    await nomeCampos.nth(i).fill(hospedes[i].nome);
    await cpfCampos.nth(i).fill(hospedes[i].cpf);
  }

  await this.page.locator('#copiar-dados-comprador').check();
}

  async fillDadosComprador(email: string, telefone: string) {
    await this.page.locator('input[type="email"][formcontrolname="email"]').fill(email);
    await this.page.locator('input[formcontrolname="email_c"]').fill(email);
    await this.page.locator('input[formcontrolname="fone"]').fill(telefone);
  }

  async fillEndereco(cep: string, logradouro: string, numero: string, complemento: string, bairro: string) {
  await this.page.locator('input[formcontrolname="cep"]').fill(cep);
  await this.page.waitForTimeout(2000);
  await this.page.locator('input[formcontrolname="endereco"]').fill(logradouro);
  await this.page.locator('input[formcontrolname="numero"]').fill(numero);
  await this.page.locator('input[formcontrolname="complemento"]').fill(complemento);
  await this.page.locator('input[formcontrolname="bairro"]').fill(bairro);
}

  async fillDadosCartao(numero: string, nome: string, validade: string, cvv: string) {
    await this.page.locator('input[name="cc-number"]').fill(numero);
    await this.page.locator('input[name="cc_nome"]').fill(nome);
    await this.page.locator('input[name="cc-exp"]').fill(validade);
    await this.page.locator('#input-cvv').fill(cvv);
  }

  async selectCartaoCredito() {
  await this.page.locator('label[for="cartao"]').click();
  }
}

