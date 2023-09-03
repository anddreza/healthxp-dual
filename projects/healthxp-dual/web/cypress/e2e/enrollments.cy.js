import data from '../fixtures/enrollments.json'
import enrollsPage from '../support/pages/components/EnrollsPage'

describe('matriculas', () => {
	it('deve poder matricular um novo aluno', () => {
		const dataTest = data.create

		cy.task('resetStudent', dataTest.student)
		cy.adminLogin()
		
		enrollsPage.navbar.gotToEnrolls()
		enrollsPage.goToForm()
		enrollsPage.selectItem('student', dataTest.student.name)
		enrollsPage.selectItem('plan', dataTest.plan.name)
		enrollsPage.fillCard(dataTest.student)
		enrollsPage.submit()

		enrollsPage.popup.haveText('Matrícula cadastrada com sucesso.')

	})

	it('não deve criar matricula duplicada', () => {
		// Primeira coisa a fazer é definir a massa de teste diferente da que foi usada no cenário anterior
		const dataTest = data.duplicate

		// reconstrução do usuário 
		cy.task('resetStudent', dataTest.student)
		cy.createEnroll(dataTest)

		cy.adminLogin()
		
		enrollsPage.navbar.gotToEnrolls()
		enrollsPage.goToForm()
		enrollsPage.selectItem('student', dataTest.student.name)
		enrollsPage.selectItem('plan', dataTest.plan.name)
		enrollsPage.fillCard(dataTest.student)
		enrollsPage.submit()
		
		enrollsPage.popup.haveText('O aluno já possui matrícula cadastrada!')


	})
})