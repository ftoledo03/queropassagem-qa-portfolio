export const hotelSearchSelectors = {
  // Search
  destinationInput: { role: 'textbox' as const, name: 'Para onde você vai?' },
  checkinInput: { role: 'textbox' as const, name: 'Check-in' },
  checkoutInput: { role: 'textbox' as const, name: 'Check-out' },
  guestsInput: '#hospede-input-field input',
  searchButton: { role: 'button' as const, name: 'BUSCAR HOSPEDAGEM' },
  hotelsHeading: { role: 'heading' as const, name: 'Hotéis mais baratos' },

  // Results
  viewRoomsButton: 'a.ver_quartos',
  checkoutLabel: 'label[for="dt-checkout"]',

  // Rooms
  selectRoomButton: { role: 'button' as const, name: 'Selecionar' },
  bookRoomButton: { role: 'button' as const, name: 'Reservar' },
  continueButton: { role: 'button' as const, name: 'CONTINUAR' },
  continueButtonFallback: 'button.continuar',

  // Checkout - Guest data
  guestName: 'input[formcontrolname="nome"]',
  guestCpf: 'input[formcontrolname="cpf"]',
  guestCopyDataCheckbox: '#copiar-dados-comprador',

  // Checkout - Buyer data
  buyerEmail: 'input[type="email"][formcontrolname="email"]',
  buyerConfirmEmail: 'input[formcontrolname="email_c"]',
  buyerPhone: 'input[formcontrolname="fone"]',

  // Checkout - Address
  addressZipCode: 'input[formcontrolname="cep"]',
  addressStreet: 'input[formcontrolname="endereco"]',
  addressNumber: 'input[formcontrolname="numero"]',
  addressComplement: 'input[formcontrolname="complemento"]',
  addressNeighborhood: 'input[formcontrolname="bairro"]',

  // Checkout - Payment
  paymentCreditCard: 'label[for="cartao"]',
  paymentCardNumber: 'input[name="cc-number"]',
  paymentCardName: 'input[name="cc_nome"]',
  paymentCardExpiry: 'input[name="cc-exp"]',
  paymentCardCvv: '#input-cvv',
};