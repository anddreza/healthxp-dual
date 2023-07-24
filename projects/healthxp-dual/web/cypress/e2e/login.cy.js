import users from '../fixtures/users.json'
import login from '../support/pages/LoginPage'
import dash from '../support/pages/DashPage'
describe ('login', () => {
	it('deve logar com o perfil do admin',  () => {
		const user = users.admin
		//const login = new LoginPage()
		
		login.doLogin(user)
		//cy.doLogin(user)
		dash.userLoggedIn(user.name)
			
	})

	it('não deve logar com senha incorreta', () => {
		const user = users.inv_pass

		login.doLogin(user)
		login.popUpHave('Suas credenciais são inválidas, por favor tente novamente!')

	})

	it('não deve logar com email não cadastrado', () => {
		const user = users.email_not_found

		login.doLogin(user)
		login.popUpHave('Suas credenciais são inválidas, por favor tente novamente!')

	})

	it('não deve logar com emails incorretos', () => {
		const emails = users.inv_emails
		login.go()
	
		let outputMessages = []
		let expectedMessages = []

		emails.forEach((u) => {
			login.fill(u)
			login.submit()

			login.popUp()
				.invoke('text')
				.then((t) => {
					cy.log(t)
					outputMessages.push(t)
					expectedMessages.push('Insira um email válido.')
				})
			//login.popUpHave('Insira um email válido.')
			login.popUpBack()
		});

		cy.wrap(outputMessages).should('deep.equal', expectedMessages )
	})

	it('não deve logar com email em branco', () => {
		const user = users.empty_email

		login.doLogin(user)
		login.popUpHave('Os campos email e senha são obrigatórios.')

	})

	it('não deve logar com senha em branco', () => {
		const user = users.empty_password
		login.doLogin(user)
		login.popUpHave('Os campos email e senha são obrigatórios.')

	})
})

