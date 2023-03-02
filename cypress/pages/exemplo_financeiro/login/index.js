import Base from '../../base_page'
import mockExemploFinanceiro from '../../../../cypress/support/mockExemploFinanceiro'

const el = require('./elements').ELEMENTS;

export class Login_Exemplo extends Base {

    static visitar_pagina(){
        super.visit(Cypress.env("exemplo").frontend)
    }

    static fazer_login(){
        if(Cypress.env('MockRequest')){
            mockExemploFinanceiro()
            super.typeElement(el.LOGIN.USER, "usuariofalse")
            super.typeElement(el.LOGIN.PASSWORD, "qualquersenha")
            super.clickElement(el.LOGIN.BTN_LOGIN)
        }else{
            var user = Cypress.env("users").user_exemplo;
            super.typeElement(el.LOGIN.USER, user.email)
            super.typeElement(el.LOGIN.PASSWORD, user.senha)
            super.clickElement(el.LOGIN.BTN_LOGIN)
        }
    }
    
}

