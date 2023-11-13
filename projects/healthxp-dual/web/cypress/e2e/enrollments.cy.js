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
		const dataTest = data.duplicate

		// reconstrução do usuário 
		cy.task('resetStudent', dataTest.student)

		let studentId; 
		cy.task('selectStudentId', dataTest.student.email)
			.then(result => {
				//PRIMEIRO RODOU ESSE: cy.log(JSON.stringfy(result)) o resultado está em temp.json
				cy.log(result.sucess.rows[0].id) //-> Agora consegue pegar o ID do usuário que foi cadastrado

				//CRIOU A VARIAVEL let studentId;
				//Depois de verificar o id, insere nela

				studentId = result.sucess.rows[0].id


				payload = {
					student_id: studentId, //troca esse valor por studentId
					plan_id: dataTest.plan.id,   ///troca esse valor por dataTest.plan.id
					credit_card: "4242"
				}	


			})
		//Ele não consegue pegar as informações porque o id vem no mesmo momento que a implementação do payload, o ID não vem para dentro, e não é possível visualizar
		cy.log(JSON.stringify(payload))

		//Uma função do Cypress para consumir a API

		cy.request({
			url: 'http://localhost:3333/enrollments', 
			method: POST,
			body: payload 
		})


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