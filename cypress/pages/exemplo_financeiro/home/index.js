import Base from '../../base_page'

const el = require('./elements').ELEMENTS;

export class Home_Exemplo extends Base {

    static valida_saldo_conta(nomeConta, valor){
        super.getElementByXPath(el.SALDO.FN_XP_SALDO_CONTA(nomeConta)).should('contain', valor)
    }
    
}