import {Given, When, Then, After, Before, And} from 'cypress-cucumber-preprocessor/steps'

import {Header_Exemplo} from '../../../pages/exemplo_financeiro/header'
import {Login_Exemplo} from '../../../pages/exemplo_financeiro/login'

Given('que esteja logado na conta do {string}', (nome) => {
    Login_Exemplo.visitar_pagina()
    Login_Exemplo.fazer_login(nome);
})

Given(`que esteja com o banco de dados resetados`, () => {
    Header_Exemplo.reset_app()
    Header_Exemplo.valida_mensagem_toast('Dados resetados com sucesso!')
})

Then(`deverá deslogar da conta no site de exemplo`, () => {
    Header_Exemplo.deslogar()
    Header_Exemplo.valida_mensagem_toast('Até Logo!')
})

Then(`deverá apresentar a mensagem {string} no site de exemplo`, (msg) => {
    Header_Exemplo.valida_mensagem_toast(msg)
})
