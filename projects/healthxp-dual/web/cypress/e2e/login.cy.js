import users from '../fixtures/users.json'
describe ('login', () => {
	it('deve logar com o perfil do admin',  () => {
		const user = users.admin
		cy.log(JSON.stringify(user))
		cy.visit('http://localhost:3000')
		cy.get('input[name=email]').type(user.email)
		cy.get('input[name=password]').type(user.password)
		cy.contains('button', 'Entrar').click()

		cy.contains('aside .logged-user', 'Olá, ' + user.name)
			.click()
		

		cy.contains('aside .logged-user', 'Olá, Admin')
			.should('be.visible')
			
	})

	it('não deve logar com senha incorreta', () => {
		const user = users.inv_pass

		cy.visit('http://localhost:3000')
		cy.get('input[name=email]').type(user.email)
		cy.get('input[name=password]').type(user.password)
		cy.contains('button', 'Entrar').click()

		cy.get('#swal2-content')
			.should('be.visible')
			.should('have.text', 'Suas credenciais são inválidas, por favor tente novamente!')

	})

	it('não deve logar com email não cadastrado', () => {
		const user = users.email_not_found

		cy.visit('http://localhost:3000')
		cy.get('input[name=email]').type(user.email)
		cy.get('input[name=password]').type(user.password)
		cy.contains('button', 'Entrar').click()

		cy.get('#swal2-content')
			.should('be.visible')
			.should('have.text', 'Suas credenciais são inválidas, por favor tente novamente!')

	})

	it('não deve logar com email incorreto', () => {
		const user = users.inv_email

		cy.visit('http://localhost:3000')
		cy.get('input[name=email]').type(user.email)
		cy.get('input[name=password]').type(user.password)
		cy.contains('button', 'Entrar').click()

		cy.get('#swal2-content')
			.should('be.visible')
			.should('have.text', 'Insira um email válido.')

	})
})