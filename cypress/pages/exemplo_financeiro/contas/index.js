import Base from '../../base_page'

const el = require('./elements').ELEMENTS;

export class Conta_Exemplo extends Base{

    static inserir_conta(nomeConta){
        if(Cypress.env('MockRequest')){
            cy.intercept('POST', Cypress.env("exemplo").backend + '/contas',{
                statusCode: 201,
                fixture: 'exemplo_financeiro/mock/post_response_conta_valida.json'
            })
            .as('postConta')
    
            cy.intercept('GET', Cypress.env("exemplo").backend + '/contas',{
                fixture: 'exemplo_financeiro/mock/get_response_contas_atualizadas.json'
            })
            .as('contas Atualizadas')
        }
        
        super.typeElement(el.CONTAS.NOME,nomeConta)
        super.clickElement(el.CONTAS.BTN_SALVAR)
    }

    static inserir_conta_duplicada(nomeConta){
        if(Cypress.env('MockRequest')){
            cy.intercept('POST','/contas',{
                statusCode: 400,
                body: {error: "Já existe uma conta com esse nome!"}
            }).as('postContaDuplicada')
        }
        
        super.typeElement(el.CONTAS.NOME,nomeConta)
        super.clickElement(el.CONTAS.BTN_SALVAR)
    }

    static editar_uma_conta(nomeConta){
        super.getElementByXPath(el.CONTAS.FN_XP_BTN_ALTERAR(nomeConta)).click()
        super.clickElement(el.CONTAS.BTN_SALVAR)
    }
}

