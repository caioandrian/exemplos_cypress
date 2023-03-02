import Base from '../../base_page'
import {Header_Exemplo} from '../../../pages/exemplo_financeiro/header'
import {Conta_Exemplo} from '../../../pages/exemplo_financeiro/contas'

const el = require('./elements').ELEMENTS;

export class Movimentacao_Exemplo extends Base {

    static inserir_transacao(desc, valor, interessado, nome_conta){
        if(Cypress.env('MockRequest')){
            cy.intercept('POST','/transacoes',{
                statusCode: 201,
                fixture: 'exemplo_financeiro/mock/post_response_nova_transacao.json'
            }).as('postMovimentacao')
    
            cy.intercept('GET','/extrato/**',{
                statusCode: 200,
                fixture: 'exemplo_financeiro/mock/get_response_movimentacao_atualizada.json'
            }).as('movimentacoes')
        }
    
        if(!Cypress.env('MockRequest')){
            Header_Exemplo.acessar_menu_conta();
            Conta_Exemplo.inserir_conta(nome_conta)
        }
    
        Header_Exemplo.acessar_menu_movimentacao()
        super.typeElement(el.MOVIMENTACAO.DESCRICAO, desc)

        //let valorFinal = parseFloat(valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        let valorFinal = parseFloat(valor.toLocaleString('pt-br', {minimumFractionDigits: 2}));

        super.typeElement(el.MOVIMENTACAO.VALOR,valorFinal)
        super.typeElement(el.MOVIMENTACAO.INTERESSADO,interessado)
        super.selectOption(el.MOVIMENTACAO.CONTA, nome_conta)

        this.salvar()
    }

    static valida_campos(descricao, contaSelecionada){
        super.explicitWait()
        super.validateElementVal(el.MOVIMENTACAO.DESCRICAO, descricao)
        super.clickElement(el.MOVIMENTACAO.STATUS)
        super.selectOption(el.MOVIMENTACAO.CONTA, contaSelecionada)
    }

    static salvar(){
        super.clickElementByText("Salvar")
    }
}