class ResetPassPage {

    go(token) {
        cy.visit('/reset-password?token=' + token)

        cy.get('form h1')
            .should('have.text', 'Resetar senha')
    }
    submit(newPass, confirmNewPass) {
        cy.get('input[placeholder="Nova senha"]')
            .type(newPass)

        cy.get('input[placeholder="Confirmação da senha"]')
            .type(confirmNewPass)

        cy.contains('button', 'Alterar senha')
            .click()
    }
    noticeShouldBe(expectdText) {
        cy.get('.notice p', { timeout: 10000 })
            .should('be.visible')
            .should('have.text', expectdText)
    }
}

export default new ResetPassPage()