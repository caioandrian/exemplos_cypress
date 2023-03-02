import {Given, When, Then, After, Before} from 'cypress-cucumber-preprocessor/steps'

import {Header_Exemplo} from '../../../pages/exemplo_financeiro/header'
import {Conta_Exemplo} from '../../../pages/exemplo_financeiro/contas'


Given(`que tenha uma conta cadastrada com o nome {string}`, (nome_conta) => {
    if(!Cypress.env('MockRequest')){
        Header_Exemplo.acessar_menu_conta();
        Conta_Exemplo.inserir_conta(nome_conta)
        Header_Exemplo.valida_mensagem_toast('Conta inserida com sucesso!')
    }
})

When(`criar uma conta com um nome válido`, () => {
    Header_Exemplo.acessar_menu_conta();
    Conta_Exemplo.inserir_conta('Carteira')
})

When(`criar uma conta com um nome que já existe no sistema`, () => {
    Header_Exemplo.acessar_menu_conta();
    Conta_Exemplo.inserir_conta_duplicada('Carteira')
})