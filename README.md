# 📍 healthxp-dual 

Projeto aprendido em bootcamp DualExperience da plataforma QAExperience. Para mais informações acessar: http://qaxperience.com/

## Start: 
#### 1. O que foi utilizado?
- Javascript
- Cypress
- Vue.js
- Git
- Insomnia ou Postman

[![My Skills](https://skillicons.dev/icons?i=js,vue,git,postman)](https://skillicons.dev)


#### 2. Realizar as devidas instalações na api e web.
Depois de baixado o projeto é necessário todas as vezes que subir:

* npm run dev no projeto api
*  npm run dev no projeto web

No meu caso como sempre rodo as informações dentro da uma versão específica do node, então é necessário sempre realizar um 

* nvm use 18.12.1

Para subir o Cypress dentro do projeto e rodar todos os dias. Depois de já realizado a instalação corretamente:
- QAx2/projects/healthxp-dual/web
- npx cypress open  

#### 3. Como gerar cartões de crédito? 
https://stripe.com/docs/testing


#### Observação de aula

* Módulo 3 - Aula 9: Cadastrando matrículas:
Instalação do Insomnia
Fetch/XHR -> chamadas que a API faz para consumir o back-end. 

Explicação breve sobre o Erro: 
Erro 4XX -> erro para quem está consumindo a API, o lado do cliente
Quando estou tratando informações da API, o ser humano é a terceira pessoa, a primeira "pessoa" é a aplicação que está consumindo a API

Essa imagem mostra como ficará quando feito login: 
<img src="./projects/healthxp-dual/web/heath_session.png">

Essa imagem mostra exatamente como ficará quando realizado corretamente a chamada da API: 
<img src="./projects/healthxp-dual/web/insomnia_enrollments.png">
