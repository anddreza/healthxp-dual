class Popup{

	element(){
		return cy.get('#swal2-content')
	}

	haveText(text){
		cy.get('#swal2-content')
			.should('be.visible')
			.should('have.text', text)
	}
	back(){
		cy.get('.swal2-cancel')
			.click()
	}
}

export default new Popup()