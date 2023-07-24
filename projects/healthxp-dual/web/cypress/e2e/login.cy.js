import users from '../fixtures/users.json'
import login from '../support/pages/LoginPage'
describe ('login', () => {
	it('deve logar com o perfil do admin',  () => {
		const user = users.admin
		//const login = new LoginPage()
		login.submit(user)
		//cy.doLogin(user)
		cy.contains('aside .logged-user', 'Olá, ' + user.name)
		   .should('be.visible')		
	})

	it('não deve logar com senha incorreta', () => {
		const user = users.inv_pass

		login.submit(user)
		login.popUpHave('Suas credenciais são inválidas, por favor tente novamente!')

	})

	it('não deve logar com email não cadastrado', () => {
		const user = users.email_not_found

		login.submit(user)
		login.popUpHave('Suas credenciais são inválidas, por favor tente novamente!')

	})

	it('não deve logar com email incorreto', () => {
		const user = users.inv_email

		login.submit(user)
		login.popUpHave('Insira um email válido.')

	})

	it('não deve logar com email em branco', () => {
		const user = users.empty_email

		login.submit(user)
		login.popUpHave('Os campos email e senha são obrigatórios.')

	})

	it('não deve logar com senha em branco', () => {
		const user = users.empty_password
		login.submit(user)

	})
})

