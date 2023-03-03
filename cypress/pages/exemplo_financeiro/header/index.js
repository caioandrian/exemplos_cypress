import Base from '../../base_page'

const el = require('./elements').ELEMENTS;

export class Header_Exemplo extends Base{

    static acessar_menu_conta(){
        super.implicitWait("GET", "/contas");
        super.clickElement(el.MENU.SETTINGS).then(() => {
            super.clickElement(el.MENU.CONTAS)
        })
    }

    static acessar_menu_home(){
        if(Cypress.env('MockRequest')){
            cy.intercept('GET','/saldo',{
                statusCode: 200,
                fixture: 'exemplo_financeiro/mock/get_response_transacao_saldo_atualizado.json'
            }).as('saldoAtualizado')
        }

        super.implicitWait("GET", "/saldo");
        super.clickElement(el.MENU.HOME)
    }

    static acessar_menu_extratos(){
        super.implicitWait("GET", "/extrato/**");
        super.clickElement(el.MENU.EXTRATO)
    }

    static acessar_menu_movimentacao(){
        super.implicitWait("GET", "/contas");
        super.clickElement(el.MENU.MOVIMENTACAO)
    }

    static valida_mensagem_toast(texto){
        //super.explicitWait(4000)
        super.validateTextExistOnPage(texto)
        super.validateElementTextByIndex(el.MESSAGE, 0, texto)
        super.clickElementByIndex(el.BTN_CLOSE_MESSAGE, 0)
    }

    static reset_app(){
        super.explicitWait()
        super.clickElement(el.MENU.SETTINGS).then( () => {
            super.clickElement(el.MENU.RESETAR)
        })
    }

    static deslogar(){
        super.explicitWait()
        super.clickElement(el.MENU.SETTINGS).then( () => {
            super.clickElement(el.MENU.SAIR)
        })
    }
}