describe ('login', () => {
	it('deve logar com o perfil do admin', () => {
		//Dado que eu tenho um usuário admin cadastrado
		//
		cy.fixture('users.json').then(function(users){
			cy.log(users)
		})
		// Se eu rodar sem as outras informações no cypress aparece um Objet{3}
			
	})
})