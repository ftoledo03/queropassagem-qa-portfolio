Feature: Reserva de hotéis - Quero Passagem

  Background:
    Given que o usuário acessa a página de hotéis

  Scenario: Busca de hospedagem com sucesso
    When informa o destino "Rio de Janeiro"
    And seleciona data de check-in e check-out
    And informa 2 adultos
    And clica em buscar hospedagem
    Then o sistema exibe as opções de hotéis disponíveis

  Scenario: Exibir preço conforme quantidade de hóspedes
    When realiza uma busca com 1 adulto
    Then o sistema exibe preços para ocupação individual
    When altera para 2 adultos
    Then o sistema atualiza os preços conforme a nova ocupação

  Scenario: Aplicar filtros na busca de hotéis
    Given que o usuário realizou uma busca de hospedagem
    When aplica filtro por preço
    And aplica filtro por avaliação
    Then o sistema atualiza a lista de hotéis conforme os filtros

  Scenario: Visualizar detalhes do hotel
    Given que o usuário está na lista de resultados
    When seleciona um hotel
    Then o sistema exibe informações detalhadas do hotel
    And exibe fotos e tipos de quartos disponíveis

  Scenario: Selecionar um quarto
    Given que o usuário está na página de detalhes do hotel
    When escolhe um tipo de quarto disponível
    Then o sistema permite avançar para a reserva

  Scenario: Preencher dados da reserva
    Given que o usuário selecionou um quarto
    When informa nome completo
    And informa e-mail
    And informa telefone
    Then o sistema valida os dados informados

  Scenario: Validar campos obrigatórios
    Given que o usuário está na tela de dados da reserva
    When tenta continuar sem preencher os campos obrigatórios
    Then o sistema exibe mensagens de erro

  Scenario: Exibir opções de pagamento
    Given que o usuário preencheu os dados corretamente
    When avança para pagamento
    Then o sistema exibe opções como cartão e Pix

  Scenario: Interromper fluxo antes da finalização
    Given que o usuário chegou na etapa de pagamento
    When decide não concluir a compra
    Then o fluxo é interrompido sem efetivar a reserva

  Scenario: Alterar parâmetros da busca
    Given que o usuário realizou uma busca
    When altera o destino ou datas
    And realiza nova busca
    Then o sistema atualiza os resultados corretamente

  Scenario: Ordenar resultados por preço
    Given que o usuário visualiza os resultados da busca
    When seleciona ordenação por menor preço
    Then o sistema reorganiza os resultados em ordem crescente

  Scenario: Reserva com criança
    When adiciona uma criança na busca
    And realiza a busca
    Then o sistema exibe regras conforme política do hotel

  Scenario: Sessão expirada durante o fluxo
    Given que o usuário está no fluxo de reserva
    When a sessão expira
    Then o sistema solicita nova ação ou redireciona para o início

  Scenario: Falha ao carregar resultados
    When realiza uma busca de hospedagem
    And ocorre erro na consulta
    Then o sistema exibe mensagem de erro amigável

  Scenario: Utilizar créditos na reserva
    Given que o usuário possui saldo na carteira digital
    When realiza uma nova reserva
    Then o sistema permite utilizar os créditos como forma de pagamento

  Scenario: Cancelamento com geração de crédito
    Given que o usuário possui uma reserva com tarifa flexível
    When realiza o cancelamento
    Then o sistema disponibiliza o valor em créditos na carteira digital