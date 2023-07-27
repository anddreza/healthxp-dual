// aqui temos uma classe representando a página de login, aqui tem mais organização que no Cypress.Commands
import popup from './components/Popup'
class LoginPage{

	constructor(){
		this.popup = popup
	}

	go(){
		cy.visit('http://localhost:3000')
	}
	fill(user){
		cy.get('input[name=email]').clear({force: true}).as('email')
		cy.get('input[name=password]').clear({force: true}).as('password')

		user.email ? cy.get('@email').type(user.email) : cy.log('empty email')
		user.password ? cy.get('@password').type(user.password) : cy.log('empty password')


		/*if(user.email){
			cy.get('@email')
				.clear({force: true})
				.type(user.email)
		} else {
			cy.log('empty email')
		}
	
		if(user.password){
			cy.get('@password')
				.clear({force: true})
				.type(user.password)
		}*/
	}
	submit(){	
		cy.contains('button', 'Entrar').click()
	}

	doLogin(user){
		this.go()
		this.fill(user)
		this.submit()
	}

}

export default new LoginPage()