import users from '../fixtures/users.json'
describe ('login', () => {
	it('deve logar com o perfil do admin',  () => {
		const user = users.admin
		cy.log(JSON.stringify(user))
		cy.visit('http://localhost:3000')
		cy.get('input[name=email]').type(user.email)
		cy.get('input[name=password]').type(user.password)
		cy.contains('button', 'Logar').click()

		cy.contains('aside .logged-user', 'Olá, ' + user.name)
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

	it('não deve logar com email em branco', () => {
		const user = users.empty_email

		cy.visit('http://localhost:3000')
		if(user.email){
			cy.get('input[name=email]').type(user.email)
		}
		cy.get('input[name=password]').type(user.password)	
		cy.contains('button', 'Entrar').click()

		cy.get('#swal2-content')
			.should('be.visible')
			.should('have.text', 'Os campos email e senha são obrigatórios.')

	})

	it('não deve logar com senha em branco', () => {
		const user = users.empty_password

		cy.visit('http://localhost:3000')
		if(user.email){
			cy.get('input[name=email]').type(user.email)
		}
		if(user.password){
			cy.get('input[name=password]').type(user.password)		
		}
		cy.contains('button', 'Entrar').click()

		cy.get('#swal2-content')
			.should('be.visible')
			.should('have.text', 'Os campos email e senha são obrigatórios.')

	})
})