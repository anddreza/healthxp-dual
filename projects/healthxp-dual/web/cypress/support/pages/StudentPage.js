import navbar from "./components/Navbar"
class StudentPage{

	constructor(){
		this.navbar = navbar
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
	popUpHave(expectedText){
		cy.get('#swal2-content')
			.should('be.visible')
			.should('have.text', expectedText)
	}
}

export default new StudentPage()