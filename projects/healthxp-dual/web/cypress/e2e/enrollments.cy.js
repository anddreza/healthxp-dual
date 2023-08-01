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
		//input[aria-label="select-student"]
		cy.get('input[aria-label="select-student"]')
			.type(dataTest.student.name)
		
		//#react-select-2-option-0
		cy.wait(3000)
	})
})