import user from '../fixtures/users.json'
describe ('login', () => {

	// Antes disso ele falhava, pois estava com arroy function, a alteração para função convencional implica em que o cypress consegue obter a massa de teste antes do teste começar, porém só funciona com função convencional 
	before(function () {
		cy.fixture('users.json').then((user)=> {
			// O JS só consegue ter acesso a variável de contexto que é o this se a função for convencional, se for função de seta ela não funciona
			this.user =user
		})
	})
	it('deve logar com o perfil do admin', function () {
		//Dado que eu tenho um usuário admin cadastrado
		//
		const user = this.user
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