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
		enrollsPage.selectItem('plan', dataTest.plan)

		enrollsPage.fillCard(dataTest.student)
		enrollsPage.submit()
		enrollsPage.popup.haveText('Matrícula cadastrada com sucesso.')

	})

	it.only('não deve criar matricula duplicada', () => {
		// Primeira coisa a fazer é definir a massa de teste diferente da que foi usada no cenário anterior
		const dataTest = data.duplicate

		// reconstrução do usuário 
		cy.task('resetStudent', dataTest.student)
		cy.task('selectStudentId', dataTest.student.email)
			.then(result => {
				//obter ID do usuário duplicado

				// esse log está dentro do callback, Cypress espera executar a consulta, para executar o comando que está no callback
				//cy.log(result.success.rows[0].id)

				//cy.log(JSON.stringify(payload))

				cy.request({
					url: 'http://localhost:3333/sessions',
					method: 'POST',
					body: {
						email: "admin@healthxp.com",
						password: "xperience"
					}
				}).then(response => {
					cy.log(response.body.token)

					const payload = {
						student_id: result.success.rows[0].id,
						plan_id: dataTest.plan.id,
						credit_card: "4242"
					}

					cy.request({
						url: 'http://localhost:3333/enrollments',
						method: 'POST',
						body: payload,
						headers: {
							Authorization: 'Bearer ' + response.body.token
						}
					}).then(response => {
						expect(response.status).to.eq(201)
					})
				})
			})

		// o log cy.log(JSON.stringify(payload)) e const payload está fora do callback, no mesmo nível da execução da stack, o Cypress roda os dois ao mesmo tempo, por isso o log não aparece o ID.

		//request é uma função do cypress para consumir a API
		//cy.log(JSON.stringify(payload))
		// -> verificar se está vindo o body na requisição, na interface do cypress

	})
})