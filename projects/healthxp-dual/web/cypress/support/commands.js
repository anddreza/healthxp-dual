// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/*Cypress.Commands.add('doLogin', (user) => {
	// temos uma função que faz login
	cy.visit('http://localhost:3000')

	if(user.email){
		cy.get('input[name=email]').type(user.email)
	}

	if(user.password){
		cy.get('input[name=password]').type(user.password)
	}
		cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('popUpHave', (text) => {
	cy.get('#swal2-content')
			.should('be.visible')
			.should('have.text', text)
})*/
import users from '../fixtures/users.json'
import loginPage from './pages/LoginPage'
import studentPage from './pages/StudentPage'

Cypress.Commands.add('adminLogin', () => {
	const user = users.admin
	loginPage.doLogin(user)
	studentPage.navbar.userLoggedIn(user.name)
})

Cypress.Commands.add('createEnroll', (dataTest) => {
	cy.task('selectStudentId', dataTest.student.email)
		.then(result => {
			//obter ID do usuário duplicado

			// esse log está dentro do callback, Cypress espera executar a consulta, para executar o comando que está no callback
			//cy.log(result.success.rows[0].id)

			//cy.log(JSON.stringify(payload))

			cy.request({
				url: 'http://localhost:3333/sessions',
				method: 'POST',
				body: {
					email: "admin@healthxp.com",
					password: "xperience"
				}
			}).then(response => {
				cy.log(response.body.token)

				const payload = {
					student_id: result.success.rows[0].id,
					plan_id: dataTest.plan.id,
					credit_card: "4242"
				}

				cy.request({
					url: 'http://localhost:3333/enrollments',
					method: 'POST',
					body: payload,
					headers: {
						Authorization: 'Bearer ' + response.body.token
					}
				}).then(response => {
					expect(response.status).to.eq(201)
				})
			})
		})
})