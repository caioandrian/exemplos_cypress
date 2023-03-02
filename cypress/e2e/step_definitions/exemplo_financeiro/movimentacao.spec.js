import {Given, When, Then, After, Before, And} from 'cypress-cucumber-preprocessor/steps'

import {Header_Exemplo} from '../../../pages/exemplo_financeiro/header'
import {Movimentacao_Exemplo} from '../../../pages/exemplo_financeiro/movimentacao/'
import {Extratos_Exemplo} from '../../../pages/exemplo_financeiro/extratos'
import {Home_Exemplo} from '../../../pages/exemplo_financeiro/home'

Given(`que esteja na página de extrato`, () => {
    Home_Exemplo.valida_saldo_conta('Conta para saldo', '534,00')
    Header_Exemplo.acessar_menu_extratos();
})

When('criar uma nova transação com {string}, {string}, {string} e {string}', (descricao, valor, interessado, nome_conta) => {
    Header_Exemplo.acessar_menu_movimentacao()
    Movimentacao_Exemplo.inserir_transacao(descricao, valor, interessado, nome_conta)
})

When(`editar a transação com a descrição {string} referente a conta {string}`, (descricao_transacao, nome_conta) => {
    Extratos_Exemplo.editar_transacao(descricao_transacao)
    Movimentacao_Exemplo.valida_campos(descricao_transacao, nome_conta)
    Movimentacao_Exemplo.salvar()
})

When(`remover a transação com a descrição {string}`, (descricao_transacao) => {
    Extratos_Exemplo.remover_transacao(descricao_transacao)
})

Then(`deverá apresentar um total {string} a {int} transações na página de extratos`, (operador, qtde) => {
    Extratos_Exemplo.valida_quantidade_de_transacoes(qtde, operador);
})

Then(`deverá encontrar a transação criada com a descrição {string} e {string}`, (descricao, valor) => {
    Extratos_Exemplo.valida_ultima_transacao_realizada(descricao, valor);
})

Then(`apresentar o saldo atualizado da conta {string} com valor de {string}`, (nome_conta, valor) => {
    Header_Exemplo.acessar_menu_home()
    Home_Exemplo.valida_saldo_conta(nome_conta, valor)
})
