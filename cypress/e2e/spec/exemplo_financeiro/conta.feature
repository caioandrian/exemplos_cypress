#language: pt

@funcionalidade_conta
Funcionalidade: Conta
    Como cliente da aplicação
    Quero ter uma ou mais contas para movimentação

    Contexto:
        Dado que esteja logado com uma conta ativa
        E que esteja com o banco de dados resetados

    @criar_conta
    Cenário: Criar conta para movimentação
        Quando criar uma conta com o nome "Carteira"
        Então deverá apresentar a mensagem "Conta inserida com sucesso!" no site de exemplo
        E deverá deslogar da conta no site de exemplo

    @criar_conta_invalida
    Cenário: Criar uma conta DUPLICADA para movimentação 
        Dado que tenha uma conta cadastrada com o nome "Carteira"
        Quando tentar criar novamente uma conta com o nome "Carteira"
        Então deverá apresentar a mensagem "Erro: Error: Request failed with status code 400" no site de exemplo
        E deverá deslogar da conta no site de exemplo