import students from '../fixtures/students.json'
import studentPage from '../support/pages/StudentPage'
describe('students', ()=> {
	it('deve poder cadastrar um novo aluno', () => {
		const student = students.create
	
		cy.task('deleteStudent', student.email)
		cy.adminLogin()
		//cy.contains('a', 'Cadastrar').click()
		
		studentPage.goToRegister()
		studentPage.submitForm(student)
		studentPage.popUpHave('Dados cadastrados com sucesso.')
	})
})