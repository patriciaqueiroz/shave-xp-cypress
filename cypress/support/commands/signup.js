Cypress.Commands.add('signup', (name = null, email = null, password = null) => {
    cy.visit('/signup')

    cy.get('form h1')
        .should('have.text', 'Faça seu cadastro')

    cy.get('input[placeholder="Nome completo"]').as('name')
    cy.get('input[placeholder="Nome completo"]').as('email')
    cy.get('input[placeholder="Nome completo"]').as('password')

    if (name) {
        cy.get('@name').type(name)
    }

    if (email) {
        cy.get('@name').type(email)
    }

    if (name) {
        cy.get('@name').type(password)
    }

    cy.contains('button', 'Cadastrar')
        .click()

})