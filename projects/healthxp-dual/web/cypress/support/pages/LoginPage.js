// aqui temos uma classe representando a página de login, aqui tem mais organização que no Cypress.Commands
class LoginPage{

	go(){
		cy.visit('http://localhost:3000')
	}
	fill(user){
		if(user.email){
			cy.get('input[name=email]').type(user.email)
		}
	
		if(user.password){
			cy.get('input[name=password]').type(user.password)
		}
	}
	submit(user){	
		cy.contains('button', 'Entrar').click()
	}

	popUpHave(text){
		cy.get('#swal2-content')
			.should('be.visible')
			.should('have.text', text)
	}
}

export default new LoginPage()