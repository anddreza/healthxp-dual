import navbar from "./components/Navbar"
import popup from "./components/Popup"
class StudentPage{

	//um constructor que é executada automaticamente quando a classe é inicializada
	constructor(){
		this.navbar = navbar
		this.popup = popup
	}

	goToRegister(){
		cy.get('a[href="/students/new"]').click()
	}

	submitForm(student){
		if(student.name) cy.get('input[name=name]').clear().type(student.name)
		if(student.email) cy.get('input[name=email]').clear().type(student.email)
		if(student.age) cy.get('input[name=age]').clear().type(student.age)
		if(student.weight) cy.get('input[name=weight]').clear().type(student.weight)
		if(student.feet_tall) cy.get('input[name=feet_tall]').clear().type(student.feet_tall)

		cy.contains('button', 'Cadastrar').click()
	}

	alertMessage(label, text){
		cy.contains('label', label)
			.parent() //para me dar o pai
			.find('span') //procurar a span
			.should('have.text', text)
	}
	//popUpHave(expectedText){
	//	cy.get('#swal2-content')
	//		.should('be.visible')
	//		.should('have.text', expectedText)
	//}
	search(name){
		cy.get('input[placeholder="Buscar por nome"]').type(name)
	}

	remove(email){
		//a linha do registro que contém o email requerido 
		cy.contains('tr', email, {timeout: 10000})
		//busca o button que é o unico que tem o icone de lixeira
			.find('button')
			.click()
	}

	ageMin(){
		cy.contains('span', 'A idade mínima para treinar é 16 anos!')
	}

	failWeightRegister(){
		if(cy.get('div[id="swal2-content"]')
			.should('have.text', 'Dados cadastrados com sucesso.')){
			return true; 
	} return false; 
	
	}

}

export default new StudentPage()