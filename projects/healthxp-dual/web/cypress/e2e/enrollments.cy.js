import data from '../fixtures/enrollments.json'
import enrollsPage from '../support/pages/components/EnrollsPage'
describe('matriculas', () => {
	it('deve poder matricular um novo aluno', () => {
		const dataTest = data.create
		cy.adminLogin()
		enrollsPage.navbar.gotToEnrolls()

		enrollsPage.goToForm()

		cy.get('.select_student')
			.click()

		cy.get('input[aria-label="select_student"]')
			.type(dataTest.student.name)

		cy.contains('div[id*=option]', dataTest.student.name)
			.click()
		// Contém div[id*=option]
		//cy.get(#react-select-2-option-0)

		cy.get('.select_plan')
			.click()

		cy.get('input[aria-label="select_plan"]')
			.type(dataTest.plan)

		cy.contains('div[id*=option]', dataTest.plan)
			.click()
	})
})