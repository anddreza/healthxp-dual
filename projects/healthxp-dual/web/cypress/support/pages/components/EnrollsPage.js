import navbar from '../components/Navbar'
class EnrollsPage{
	constructor(){
		this.navbar = navbar;
	}

	goToForm(){
		cy.get('a[href="/enrollments/new"]').click()
	}
}

export default new EnrollsPage()