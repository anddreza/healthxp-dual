describe ('login', () => {
	it('deve logar com o perfil do admin', () => {
		//Dado que eu tenho um usuário admin cadastrado
		const user = {
			name: 'Admin', 
			email: 'admin@healthxp.com',
			password: 'xperience'
		}
		// Quando faço login no gestor de academias
		cy.visit('http://localhost:3000')
		cy.get('input[name=email]').type(user.email)
		cy.get('input[name=password]').type(user.password)
		
		//cy.contains('button', 'Entrar')
		cy.contains('aside .logged-user', 'Olá, ' + user.name)
			.click()
		
		// Então devo ver o dashboard
		//cy.get('.logged-user')
		//	.should('be.visible')
		//	.should('have.text', 'Olá, Admin ') -> Aqui ele compara um texto com outro 
		cy.contains('aside .logged-user', 'Olá, Admin') //-> Aqui ele ignora o espacinho, usa o texto alvo para combinar com a busca e verificar se está visível 
			.should('be.visible')
			
	})
})