describe ('login', () => {

	before(() => {
		cy.fixture('users.json').then((user)=> {
			this.user =user
		})
	})
	it('deve logar com o perfil do admin', () => {
		//Dado que eu tenho um usuário admin cadastrado
		//
		cy.fixture('users.json').then(function(user){
			cy.log(JSON.stringify(user))
			// só para conseguir verifica o log
			cy.visit('http://localhost:3000')
			cy.get('input[name=email]').type(user.email)
			cy.get('input[name=password]').type(user.password)
			cy.contains('button', 'Entrar').click()
	
			cy.contains('aside .logged-user', 'Olá, ' + user.name)
				.should('be.visible')
		})
	})
})