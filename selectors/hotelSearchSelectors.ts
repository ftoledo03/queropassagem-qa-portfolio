export const hotelSearchSelectors = {
  destinationInput: { role: 'textbox' as const, name: 'Para onde você vai?' },
  checkinInput: { role: 'textbox' as const, name: 'Check-in' },
  checkoutInput: { role: 'textbox' as const, name: 'Check-out' },
  guestsInput: '#hospede-input-field input',
  verQuartosButton: 'a.ver_quartos',
  selecionarButton: { role: 'button' as const, name: 'Selecionado' },
};