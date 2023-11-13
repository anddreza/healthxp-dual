### Aula 1: Iniciando com Cypress: 
- Teste de software é composto por massa de teste que é a precondição, input que é a entrada de dados, output saída de dados 

- It -> define o caso de teste ou o cenário. 
- Contains é uma função dentro do cypress que combina elementos css e um texto

### Aula 2: Primeiros passos na automação web

- É bom externalizar a massa quando temos um software de médio-grande porte, dessa forma então fica mais organizado, nesse ponto iremos externalizar a massa que estava dentro do teste e iremos coloca-la dentro de fixtures.

### Aula 3: Cobertura de testes, Custom Commands e POM

- Esse cenário novo de alteração para quando vem uma mensagem de alerta e é necessário clica-la para tirar é o cenário mais ideal, necessário implementar isso, popUpBack() dê uma revisada.
- Aula 'Cadastro de matriculas', quando quiser pular um cenário pode usar o it.skip
- JSON -> é nativo, tem uma leitura mais simples apesar de ter mais linhas, é mais estratégico para montar massa de teste, é versátil, é desnormalizada
- Arrow function, function -> duas formas de trabalhar com function em javascript
- Custom Commands -> serve para encapsular 

### Aula 4: Variação de cenários
- Uso do forEach para testar diversos emails incorretos

### Aula 5: Tasks e conexão com o banco de dados 
- O manipulador task de eventos do plugin pode retornar um valor ou uma promessa.
.invoke -> posso invocar textos e propriedades
.then -> callback desse invoke
.push() -> é uma função nativa do Javascript para adicionar itens numa lista, array de texto ou string

- Utilizando o faker (foi usado somente como uma das estratégias, mas foi mostrado os malefícios da utilização)
- Instalando e implementado a biblioteca pg, acesso pelo site: http://node-postgres.com/apis/pool (foi recomendado usar o Pool, pois é mais simples, mas poderia usar o modo pg.Client)

### Aula 6: Avançando com componentes

- Components para poder ficar dividido e dar manutenção de forma mais "tranquila", o popup fica somente em um lugar e é invocado nas classes de StudentPage, LoginPage também. 

- Inserção do aluno via banco de dados: resetStudent (garantir que está inserindo o aluno)

### Aula 9: Cadastrando matriculas
- cy.resetStudent(dataTest.student): Se tiver com cascade:true ele apaga a matricula, se deletar um registro com matricula ele apaga todas as informações pertinentes aquele aluno 
- Verificando como funciona a API com o Insomnia, servir como guia.
1. Criando uma Collection: HeathXP;
2. Criando a primeira requisição: http://localhost:3333/enrollments
Verificar essa porta, porque ela roda na 5000 e as vezes na 3333, tem que verificar!
2.1 Verificar a authorization, capaz de estar errado. 



Fetch/XHR -> chamadas que a API faz para consumir o back-end. 

Explicação breve sobre o Erro: 
Erro 4XX -> erro para quem está consumindo a API, o lado do cliente
Quando estou tratando informações da API, o ser humano é a terceira pessoa, a primeira "pessoa" é a aplicação que está consumindo a API

* Essa imagem mostra como ficará quando feito login: 
<img src="../healthxp-dual/web/heath_session.png">

* Essa imagem mostra exatamente como ficará quando realizado corretamente a chamada da API: 
<img src="../healthxp-dual/web/insomnia_enrollments.png">



### Módulo 4 
- Aula 1: Construindo minha API Helper Parte 1
1. Foi criado uma pasta novo no /healthxp-dual/helpers
2. Iniciado um novo projeto com npm init 
3. Ele pediu para acessar http://www.npmjs.com/package/express
4. Instala o programa com npm install express
5. Para subir a aplicação e testar se tiver correta: node app.js[nome do arquivo]
6. Para verificar as alterações era necessário tirar e colocar a API do ar toda vez, mas para isso não acontecer mais é necessário instalar:
npm install nodemon -> ele monitora o código
7. npx nodemon app.js -> subir a aplicação então assim a partir de agora.
8. Foi usado para instalar também npm install pg > será usado o mesmo modulo para conectar no banco de dados

### Módulo 4 - Construindo minha API Helper Parte 2
Foram realizadas algumas operações de visualizações sobre informações inseridas dentro do banco de dados ElephantSQL com o objetivo de averiguar se estava funcionando corretamente. 

SELECT * FROM students where email 'johndoe@gmail.com'
