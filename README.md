# exemplos_cypress
Estudos e soluções encontradas usando o Cypress

**Seções:**

 [Automação QA](#automação-qa)
  - [Instalação e Execução do Projeto](#instalação-e-execução-do-projeto)
    - [Instalação NodeJs](#instalação-nodejs)
    - [Instalação Visual Studio Code](#instalação-visual-studio-code)
    - [Execução do Projeto](#execução-do-projeto)
      - [Extensões](#extensões)
      - [Reports em HTML](#reports-em-html)
  - [Sobre Padrão Page Object](#sobre-padrão-page-object)
  - [Arquitetura do projeto e framework de automação](#arquitetura-do-projeto-e-framework-de-automação)
  - [License](#license)
   
## Instalação e Execução do Projeto

Para realizar nossa automação, usamos o Cypress que é um framework de automação de testes E2E que usa como base o Javascript para a escrita do seu código. Com ele é possível configurar, escrever, rodar e debuggar os testes de forma simples e prática.

Para utilizar o Cypress, é necessário realizar as seguintes instalações:

- NodeJs (versão LTS)
- Visual Studio Code
- Cypress V.10+

### Instalação NodeJs

**1**. Acessar página <https://nodejs.org/en/> e recomenda-se baixar a versão mais estável;
**2**. Após download, abrir o instalador e clicar nos botões de _Next_ até o final e, por último, nos botões de _Install_ e _Finish_.
**Pronto, o NodeJs foi instalado!**

### Instalação Visual Studio Code

**1**. Acessar https://code.visualstudio.com/download e baixar a versão para Windows;

**2**. Após download, abrir o instalador e clicar nos botões de _Next_ até o final e, por último, no botão de _Finish_.
O Visual Studio Code abrirá automaticamente e pronto.
**Instalação concluída!**

### Execução do Projeto

Após as instalações do NodeJs e do VScode, vamos baixar o projeto do git.

**1**. No caminho <xxxxx>, clicar no repositório do projeto;

**2**. Clicar no botão de _Clone_ e copiar a url informada;

**3**. Na pasta de sua preferência, abrir o Prompt de Comando e executar o comando ```git clone + url copiada```;

**4**. Dentro do VScode, abrir a pasta clonada, acessar a raiz do projeto e executar no terminal o comando ```npm install```;

> Isso fará com que, na nossa estrutura de pastas, seja criado um _node_modules_ com várias dependências, incluindo o _cypress_.

**5**. A próxima etapa é executar o comando ```./node_modules/.bin/cypress open```  ou ``` npx cypress open ``` para abrir o Cypress.

**6**. Para executar vários testes de uma vez só, executar o comando ``` npm run ```.

> Ver todos os exemplos no arquivo package.json


**Pronto!** 

#### Extensões

Abaixo seguem alguns plugins que nos auxiliam na nossa automação. São eles:

- JavaScript (ES6) code snippets
- Commit Message Editor - **Formatador de commits**
- Markdown Preview Enhanced - **Visualizador de arquivos .md**
- Prettier - Code formatter - **Formatador de código**
- Material Icon Theme
- Cucumber (Gherkin) Full Support
- Cypress-cucumber-generator
- Snippets and Syntax Highlight for Gherkin (Cucumber)
- Bracket Pair Colorizer 2
- Add Only
- Cypress Snippets
- ES6 Mocha Snippets

#### Reports em HTML

Através do plugin **multiple-cucumber-html-reporter** podemos gerar relatórios em html.


- Após executar o comando ``` npm run ```, os relatórios serão gerados na pasta reports/html e reports/html_extra, sendo diferente para cada caso.
- Eventuais erros também serão capturados, apresentando a pasta screenshots dentro da pasta reports e fora dela, na pasta vídeos.


## Entendendo o Padrão Page Object 

O padrão Page Objects é muito utilizado nos projetos de automação de testes como uma forma de organizar melhor nosso código.

Ele serve para separar responsabilidades, ou seja:

- Vamos ter um local onde ficará descrita a **ação** da página que estamos trabalhando.

- E um outro local para os **elementos** dessa página.

Resumidamente, ao usar o Page Objects, estamos construindo uma classe para cada página de testes.


**Exemplo**

Vamos usar o exemplo de uma automação de Login de uma página qualquer usando o framework Cypress.

1. É preciso criar o arquivo **Login.feature**, onde ficarão salvos nossos cenários em BDD:

```
Scenario: Login do site ABC.
  Given acesso o site ABC
  When acesso a página de login
  Then devo visualizar botão de Esqueci minha senha
```

2. Agora é preciso criar o arquivo **LoginSteps.js** Ele é necessário para **mapear os passos do nosso teste**:
```
import {Given, When, Then, Before, And} from 'cypress-cucumber-preprocessor/steps'
import LoginPage from '../pageobjects/LoginPage'

  Given("acesso o site ABC", () => {
    LoginPage.acessar_site();
  })
  When("acesso a pagina de login", () => {
    LoginPage.clicar_botao_login();
  })
  Then("devo visualizar botão de Esqueci minha senha", () => {
    LoginPage.valida_botao_recuperar_senha_visivel();
  }) 
```

3. Depois é necessário **mapear os elementos da página** usada no arquivo **LoginElements.js** e disponibilizá-lo para importação em outros arquivos:

```
export const ELEMENTS = {
    LOGIN:{
        USER:   '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    }
}

```

4. Em seguida, é preciso criar o arquivo **LoginPage.js** para **mapear as funções e comandos que vamos executar**. Aqui também é necessário disponibilizá-lo para importação em outros arquivos:

```
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
            super.typeElement(el.LOGIN.USER, "usuariofalso")
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

export default LoginPage;

```

Pronto!

Esses são os passos necessários para usar o padrão Page Objects no nosso projeto!

####Vantagens de usar Page Objects:

Dentro as muitas vantagens, podemos destacar:
- Padronização;
- Organização;
- Independência dos testes;
- Evita duplicação de código;
- Fácil de manter;
- Seletores de elementos em um único lugar.

## Arquitetura do projeto e framework de automação

Utilizando o padrão Page Objects para o trabalho de automação dos testes, existem várias maneiras aceitáveis de usar este modelo de arquitetura nos projetos de automação.

Abaixo segue o modelo de estrutura que usamos em nosso projeto:

- **e2e/spec**: Nessa pasta guardaremos nossas specs como features, de acordo com a metodologia BDD.  Fica definida as seguintes convenções:
    * Dentro da pasta specs constará novas pastas com o nome do épico ou da área associada.
    * O nome das pasta deve estar sempre com letras mínusculas e/ou com uso do *underline* para cada palavra.
    * Dentro da pasta do épico deverão existir as features associadas. Sendo que o arquivo .feature deve ser nomeado como ``` nome da funcionalidade ```
  
<p>

- **e2e/step_definitions**: Nessa pasta guardaremos os métodos steps associados ao BDD. Fica definida as seguintes convenções:

  * Dentro da pasta step_definitions constará novas pastas com o nome do épico ou da área associada, além da pasta common, com o objetivo de guardar as steps comuns.
  * O nome das pasta deve estar sempre com letras mínusculas e/ou com uso do *underline* para cada palavra.
  * Dentro da pasta do épico, devemos ter os arquivos que contém as steps de cada funcionalidade, portanto deve possuir deve ser nomeado como ``` nome da funcionalidade.spec.js ```

<p>

- **fixtures**: Arquivos de massas a serem usadas na automação, sendo estáticas ou dinâmicas. Fica definida as seguintes convenções: 
  
  -  Dentro da pasta fixtures constará novas pastas com o nome do épico ou da área associada.
  -  O nome da pasta deve estar sempre com letras mínusculas e/ou com uso do *underline* para separar cada palavra.
  -  Dentro da pasta de cada épico devemos ter novas pastas com o tipo de massa que iremos utilizar, por exemplo: ``` mock ```, ``` json ``` e ``` images ```.

<p>

- **Pages**: Representa abstração de páginas, com métodos e seus elementos. Fica definida  as seguintes convenções:
  <br>

    - As pages serão divididas em pastas por nome ou componente da página, exemplo: header, home, contatos, etc.
    - Na pasta associada a página devem existir 2 arquivos:
      - index.js: possui ações usadas na página associada
      - elements.js: elementos seletores associados aquela página
  <br>
    > <br>Para criação de novas páginas deve-se extender a **base_page** de forma que todas as ações gerais sejam herdadas e usadas pelas páginas filhas. Para novas ações recomenda-se a adição destas no index da página base.
  <br>