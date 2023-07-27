import students from '../fixtures/students.json'
import studentPage from '../support/pages/StudentPage'
describe('alunos', () => {
	it('deve poder cadastrar um novo aluno', () => {
		const student = students.create

		cy.task('deleteStudent', student.email)
		cy.adminLogin()
		//cy.contains('a', 'Cadastrar').click()

		studentPage.goToRegister()
		studentPage.submitForm(student)
		studentPage.popup.haveText('Dados cadastrados com sucesso.')
	})

	it('não deve cadastrar com email duplicado', () => {
		const student = students.duplicate

		//cy.task('deleteStudent', student.email)
		cy.task('resetStudent', student)
		cy.adminLogin()

		studentPage.goToRegister()
		studentPage.submitForm(student)
		studentPage.popup.haveText('O email informado já foi cadastrado!')
	})

	it('deve remover um aluno sem matrícula', () => {
		const student = students.remove
		cy.task('resetStudent', student)
		cy.adminLogin()

		//td[text()="fernando@yahoo.com"]/..//button


		studentPage.search(student.name)
		studentPage.remove(student.email)
		studentPage.popup.confirm()
		studentPage.popup.haveText('Exclusão realizada com sucesso.')

	})

	it('todos os campos são obrigatórios', () => {
		const student = students.required

		cy.adminLogin()
		studentPage.goToRegister()
		studentPage.submitForm(student)

		//label[text()="Nome completo"]/..//span
		// Esse é mais seguro das duas opções
		studentPage.requiredMessage('Nome completo', 'Nome é obrigatório')
		studentPage.requiredMessage('E-mail', 'O email é obrigatório')
		studentPage.requiredMessage('Idade', 'A idade é obrigatória')
		studentPage.requiredMessage('Peso (em kg)', 'O peso é obrigatório')
		studentPage.requiredMessage('Altura', 'A altura é obrigatória')

		//cy.contains('span', 'Nome é obrigatório')
		//	.should('be.visible')

	})

	it('não deve cadastrar aluno com idade com 15 anos', () => {
		const student = students.student_15

		cy.adminLogin()
		studentPage.goToRegister()
		studentPage.submitForm(student)
		studentPage.ageMin()

	})

	it('não deve cadastrar aluno com peso menor ou igual a zero', () => {
		const student = students.student_weight[0]

		cy.adminLogin()
		studentPage.goToRegister()
		studentPage.submitForm(student)
		studentPage.failWeightRegister()
		cy.log(studentPage.failWeightRegister())
	})

	it('não deve cadastrar aluno com altura menor ou igual a zero', () => {
		const student = students.student_weight[1]

		cy.adminLogin()
		studentPage.goToRegister()
		studentPage.submitForm(student)
		studentPage.failWeightRegister()
		cy.log(studentPage.failWeightRegister())
	})
})