import navbar from "./components/Navbar"
import popup from "./components/Popup"
class StudentPage{

	constructor(){
		this.navbar = navbar
		this.popup = popup
	}

	goToRegister(){
		cy.get('a[href="/students/new"]').click()
	}

	submitForm(student){
		cy.get('input[name=name]').type(student.name)
		cy.get('input[name=email]').type(student.email)
		cy.get('input[name=age]').type(student.age)
		cy.get('input[name=weight]').type(student.weight)
		cy.get('input[name=feet_tall]').type(student.feet_tall)

		cy.contains('button', 'Cadastrar').click()
	}
	//popUpHave(expectedText){
	//	cy.get('#swal2-content')
	//		.should('be.visible')
	//		.should('have.text', expectedText)
	//}
	search(name){
		cy.get('input[placeholder="Buscar por nome"]').type(name)
	}

	remove(email){
		cy.contains('tr', email, {timeout: 10000})
			.find('button')
			.click()
	}
}

export default new StudentPage()