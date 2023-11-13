/*Cypress.Commands.add('doLogin', (user) => {
	// temos uma função que faz login
	cy.visit('http://localhost:3000')

	if(user.email){
		cy.get('input[name=email]').type(user.email)
	}

	if(user.password){
		cy.get('input[name=password]').type(user.password)
	}
		cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('popUpHave', (text) => {
	cy.get('#swal2-content')
			.should('be.visible')
			.should('have.text', text)
})*/


//import { data } from 'cypress/types/jquery'
import users from '../fixtures/users.json'
import loginPage from './pages/LoginPage'
import studentPage from './pages/StudentPage'

Cypress.Commands.add('adminLogin', () => {
	const user = users.admin
	loginPage.doLogin(user)
	studentPage.navbar.userLoggedIn(user.name)
})

Cypress.Commands.add('createQuestion', (question) => {
	cy.request({
		url: 'http://localhost:3333/students/3/help-orders',
		method: 'POST',
		body: question
	}).then(response => {
		expect(response.status).to.eq(201)
	})
})

Cypress.Commands.add('createEnroll', (dataTest) => {
	cy.request({
		url: 'http://localhost:5000/enrolls',
		method: 'POST', 
		body:{
			email: dataTest.student.email, 
			plan_id: dataTest.plan.id,
			price: dataTest.plan.price
		}
	}).then(response => {
		expect(response.status).to.eq(201)
	})
	// 1. A task é a selectStudentId que conecta no banco via Cypress e obtém o ID do usuário via email
	/* cy.task('selectStudentId', dataTest.student.email)
		.then(result => {
			//obter ID do usuário duplicado

			// esse log está dentro do callback, Cypress espera executar a consulta, para executar o comando que está no callback
			//cy.log(result.success.rows[0].id)

			//cy.log(JSON.stringify(payload))

			cy.request({
				// 2. Uma request na rota /sessions, na API do sistema, pq na API do sistema? Porque ela tem autenticação, tem segurança
				url: 'http://localhost:3333/sessions',
				method: 'POST',
				body: {
				// 3. Passando usuário e senha do administrador para obter o token
					email: users.admin.email,
					password: users.admin.password
				}
			}).then(response => {
				// 3. Aqui obtém o token
				cy.log(response.body.token)

				const payload = {
					student_id: result.success.rows[0].id,
					plan_id: dataTest.plan.id,
					credit_card: "4242"
				}
				// 5. É feito uma request na rota /enrollments para poder cadastrar o aluno
				cy.request({
					url: 'http://localhost:3333/enrollments',
					method: 'POST',
					body: payload,
					headers: {
						// 4. Para colocar uma matrícula no sistema via API precisa de uma autorização
						Authorization: 'Bearer ' + response.body.token
					}
				}).then(response => {
					expect(response.status).to.eq(201)
				})
			})
		}) */
})

Cypress.Commands.add('resetStudent', (student) => {
	cy.request({
		url: 'http://localhost:5000/students', 
		method: 'POST', 
		body: student
	}).then(response => {
		expect(response.status).to.eq(201)
	})
})

Cypress.Commands.add('deleteStudent', (studentEmail) => {
	cy.request({
		url: 'http://localhost:5000/students/' + studentEmail, 
		method: 'DELETE',
	}).then(response => {
		expect(response.status).to.eq(204)
	})
})