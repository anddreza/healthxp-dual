import students from '../fixtures/students.json'

import users from '../fixtures/users.json'
import login from '../support/pages/LoginPage'
import dash from '../support/pages/DashPage'
describe('students', ()=> {
	it('deve poder cadastrar um novo aluno', () => {
		const student = students.create

		const user = users.admin
		login.doLogin(user)
		dash.userLoggedIn(user.name)
	
		//cy.contains('a', 'Cadastrar').click()

		cy.get('a[href="/students/new"]').click()

		cy.get('input[name=name]').type(student.name)
		cy.get('input[name=email]').type(student.email)
		cy.get('input[name=age]').type(student.age)
		cy.get('input[name=weight]').type(student.weight)
		cy.get('input[name=feet_tall]').type(student.feet_tall)

		//button[form="formStudent"]
		cy.contains('button', 'Cadastrar').click()

	})
})