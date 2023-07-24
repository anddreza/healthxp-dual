import users from '../fixtures/users.json'
describe ('login', () => {
	it('deve logar com o perfil do admin',  () => {
		const user = users.admin
		cy.doLogin(user)
		//Isso foi centralizado lá no Cypress.Commands.add
		//cy.visit('http://localhost:3000')
		//cy.get('input[name=email]').type(user.email)
		//cy.get('input[name=password]').type(user.password)
		//cy.contains('button', 'Logar').click()

		cy.contains('aside .logged-user', 'Olá, ' + user.name)
		   .should('be.visible')		
	})

	it('não deve logar com senha incorreta', () => {
		const user = users.inv_pass

		cy.doLogin(user)
		cy.popUpHave('Suas credenciais são inválidas, por favor tente novamente!')

	})

	it('não deve logar com email não cadastrado', () => {
		const user = users.email_not_found

		cy.doLogin(user)
		cy.popUpHave('Suas credenciais são inválidas, por favor tente novamente!')

	})

	it('não deve logar com email incorreto', () => {
		const user = users.inv_email

		cy.doLogin(user)
		cy.popUpHave('Insira um email válido.')

	})

	it('não deve logar com email em branco', () => {
		const user = users.empty_email

		cy.doLogin(user)
		cy.popUpHave('Os campos email e senha são obrigatórios.')

	})

	it('não deve logar com senha em branco', () => {
		const user = users.empty_password
		cy.doLogin(user)

	})
})

