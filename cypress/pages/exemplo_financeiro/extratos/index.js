import Base from '../../base_page'

const el = require('./elements').ELEMENTS;

export class Extratos_Exemplo extends Base {

    static valida_quantidade_de_transacoes(qtde, operador = ""){
        super.validateElementLength(el.EXTRATO.LINHAS, qtde, operador)
    }

    static valida_ultima_transacao_realizada(descricao, valor){
        let valorApresentado = parseFloat(valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        //let valorApresentado = parseFloat(valor).toLocaleString('pt-br', {minimumFractionDigits: 2});

        super.getElementByXPath(el.EXTRATO.FN_XP_BUSCA_ELEMENTO(descricao, valorApresentado)).should('be.visible')
    }

    static editar_transacao(descricaoTransacao){
        if(Cypress.env('MockRequest')){
            cy.intercept('PUT','/transacoes/**',{
                statusCode: 200,
                fixture: 'exemplo_financeiro/mock/put_response_transacao_atualizada.json'
            }).as('postMovimentacao')
    
            cy.intercept('GET','/transacoes/**',{
                statusCode: 200,
                fixture: 'exemplo_financeiro/mock/get_response_transacao.json'
            }).as('getMovimentacao')
        }

        super.implicitWait("GET", "/transacoes/**")
        super.clickElementByXpath(el.EXTRATO.FN_XP_EDITAR_ELEMENTO(descricaoTransacao))
    }

    static remover_transacao(descricaoTransacao){
        if(Cypress.env('MockRequest')){
            cy.intercept('DELETE','/transacoes/*',{
            statusCode: 204,
            body: {}
        }).as('deleteTransacao')
        }

        if(Cypress.env('MockRequest')){
            cy.intercept('GET','/extrato/**',{
                statusCode: 200,
                fixture: 'exemplo_financeiro/mock/get_response_lista_atualizada_extratos.json'
            }).as('getMovimentacoesAtualizadas')
        }

        super.clickElementByXpath(el.EXTRATO.FN_XP_REMOVER_ELEMENTO(descricaoTransacao))
    }
}
