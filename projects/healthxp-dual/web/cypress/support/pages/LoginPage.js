// aqui temos uma classe representando a página de login, aqui tem mais organização que no Cypress.Commands
class LoginPage{

	go(){
		cy.visit('http://localhost:3000')
	}
	fill(user){
		if(user.email){
			cy.get('input[name=email]')
				.clear()
				.type(user.email)
		}
	
		if(user.password){
			cy.get('input[name=password]')
				.clear()
				.type(user.password)
		}
	}
	submit(){	
		cy.contains('button', 'Entrar').click()
	}

	doLogin(user){
		this.go()
		this.fill(user)
		this.submit()
	}

	popUpHave(text){
		cy.get('#swal2-content')
			.should('be.visible')
			.should('have.text', text)
	}
	popUpBack(){
		cy.get('.swal2-cancel')
			.click()
	}
}

export default new LoginPage()