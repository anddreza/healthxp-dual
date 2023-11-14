import data from '../fixtures/questions.json'
import enrollsPage from '../support/pages/components/EnrollsPage'

describe('receber perguntas', ()=> {
	it('deve poder recebr uma notificação com uma pergunta do aluno', ()=>{
		
		const dataTest = data.create;
		cy.resetStudent(dataTest.student)
		cy.createEnroll(dataTest)
		cy.createQuestion(dataTest.question)

	})
})