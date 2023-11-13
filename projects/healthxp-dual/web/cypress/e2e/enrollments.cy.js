import data from '../fixtures/enrollments.json'
import enrollsPage from '../support/pages/components/EnrollsPage'

describe('matriculas', () => {
	it('deve poder matricular um novo aluno', () => {
		const dataTest = data.create

		//cy.task('resetStudent', dataTest.student)
		cy.resetStudent(dataTest.student)
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
		//cy.task('resetStudent', dataTest.student)
		cy.resetStudent(dataTest.student)
		cy.createEnroll(dataTest)

		/*

		let studentId; 
		cy.task('selectStudentId', dataTest.student.email)
			.then(result => {
				PRIMEIRO RODOU ESSE: cy.log(JSON.stringfy(result)) o resultado está em temp.json
				cy.log(result.sucess.rows[0].id) -> Agora consegue pegar o ID do usuário que foi cadastrado

				CRIOU A VARIAVEL let studentId;
				Depois de verificar o id, insere nela

				studentId = result.sucess.rows[0].id
			})
		
		const payload = {
			student_id: 326, //troca esse valor por studentId
			plan_id: 1,   ///troca esse valor por dataTest.plan.id
			credit_card: "4242"
		}	

		Uma função do Cypress para consumir a API

		cy.request({
			url: http://localhost:3333/enrollments, 
			method: POST,
			body: payload 
		})
		*/

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