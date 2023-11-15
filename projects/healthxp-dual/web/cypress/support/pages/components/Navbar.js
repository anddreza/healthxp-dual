class Navbar{
	userLoggedIn(name){
		cy.contains('aside .logged-user', 'Olá, ' + name)
		   .should('be.visible')	
	}

	gotToEnrolls(){
		cy.get('a[href="/enrollments"]')
			.click()
	
	}

	openNotifications(){
		cy.get('.notifications button').click({ force: true })
	}
}

export default new Navbar()