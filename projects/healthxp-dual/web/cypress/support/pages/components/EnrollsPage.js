import navbar from "../components/Navbar"
// por que ele não ta lendo o caminho???
import popup from "./Popup"
class EnrollsPage {
	constructor() {
		this.navbar = navbar
		this.popup = popup
	}

	goToForm() {
		cy.get('a[href="/enrollments/new"]').click()
	}

	selectItem(item, value) {
		cy.get(`.select_${item}`)
			.click()

		cy.get(`input[aria-label="select_${item}"]`)
			.type(value)

		cy.contains(`div[id*=option]`, value)
			.click()
	}

	/* Tinha a mesma estrutura e assim pode ser reaproveita como fica acima: 
	cy.get(.select_student).click()
	cy.get(`input[aria-label="select_student"]).type(dataTest.student.name)
	cy.contains('div[id*=option]', dataTest.student.name).click()

	cy.get(.select_plan).click()
	cy.get(`input[aria-label="select_plan"]).type(dataTest.student.name)
	cy.contains('div[id*=option]', dataTest.plan.name).click()
	*/

	fillCard(student) {
		cy.get('#card_number').type('4242424242424242')
		cy.get('#card_holder').type(student.name)
		cy.get('#card_month').type('12')
		cy.get('#card_year').type('2030')
		cy.get('#card_cvv').type('123')
	}

	submit() {
		cy.contains('button', 'Cadastrar')
			.click()
	}
}

export default new EnrollsPage()