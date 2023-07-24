import students from '../fixtures/students.json'
import { faker } from '@faker-js/faker';

describe('students', ()=> {
	it('deve poder cadastrar um novo aluno', () => {
		const student = {
			name: 'Jeremy Adams',
			email: faker.internet.email(),
			age: '28',
			weight: '75',
			feet_tall: '1.80'

		}
	
		cy.adminLogin()
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