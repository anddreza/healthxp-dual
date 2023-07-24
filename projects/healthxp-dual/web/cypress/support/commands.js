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
import login from './pages/LoginPage'
import dash from './pages/DashPage'
Cypress.Commands.add('adminLogin', ()=> {
	const user = users.admin
	login.doLogin(user)
	dash.userLoggedIn(user.name)
})