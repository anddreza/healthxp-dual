import students from '../fixtures/students.json'
import studentPage from '../support/pages/StudentPage'
describe('alunos', ()=> {
	it('deve poder cadastrar um novo aluno', () => {
		const student = students.create
	
		cy.task('deleteStudent', student.email)
		cy.adminLogin()
		//cy.contains('a', 'Cadastrar').click()
		
		studentPage.goToRegister()
		studentPage.submitForm(student)
		studentPage.popup.haveText('Dados cadastrados com sucesso.')
	})

	it('não deve cadastrar com email duplicado', () =>{
		const student = students.duplicate
	
		//cy.task('deleteStudent', student.email)
		cy.task('resetStudent', student)
		cy.adminLogin()
		
		studentPage.goToRegister()
		studentPage.submitForm(student)
		studentPage.popup.haveText('O email informado já foi cadastrado!')
	})

	it('deve remover um aluno sem matrícula', () =>{
		const student = students.remove
		cy.task('resetStudent', student)
		cy.adminLogin()

		//td[text()="fernando@yahoo.com"]/..//button


		studentPage.search(student.name)
		studentPage.remove(student.email)
		studentPage.popup.confirm()
		studentPage.popup.haveText('Exclusão realizada com sucesso.')

	})
})