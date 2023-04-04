
class SignUpPage {

    constructor() {
        this.alertError = '.alert-error'
    }

    go() {

        cy.visit('/signup')

        cy.get('form h1')
            .should('have.text', 'Faça seu cadastro')


    }

    submit(name = null, email = null, password = null) {

        cy.get('input[placeholder*=Nome]').as('name')
        cy.get('input[placeholder*=email]').as('email')
        cy.get('input[placeholder*=senha]').as('password')

        if (name) {
            cy.get('@name').type(name)
        }

        if (email) {
            cy.get('@email').type(email)
        }

        if (password) {
            cy.get('@password').type(password)
        }

        cy.contains('button', 'Cadastrar').click()

    }
    noticeShouldBe(expectdText) {
        cy.get('.notice p', { timeout: 10000 })
            .should('be.visible')
            .should('have.text', expectdText)
    }

    requiredFields(nameMessage, emailMessage, passwordMessage) {
        cy.get(this.alertError)
            .should('have.length', 3)
            .and(($small) => {
                expect($small.get(0).textContent).to.equal(nameMessage)
                expect($small.get(1).textContent).to.equal(emailMessage)
                expect($small.get(2).textContent).to.equal(passwordMessage)
            })


    }
    alertShouldBe(message) {
        cy.get(this.alertError)
            .should('be.visible')
            .should('have.text', message)
    }

}

export default new SignUpPage()

