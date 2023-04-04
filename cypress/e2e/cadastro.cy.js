import signUpPage from '../support/pages/signup'
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

import data from '../fixtures/users-register'

describe('Cadastrar usuário', () => {

    context('Quando realizar o cadastro de usuario', () => {

        const user = data.user3
        it('deve realizar cadastro de usuário com sucesso', () => {

            cy.visit('/')
            cy.get('.signup').click()

            cy.get('form h1').should('have.text', 'Faça seu cadastro')

            signUpPage.go()
            cy.deleteUser(user)
            signUpPage.submit(user.name, user.email, user.password)

            const message = 'Boas vindas, faça login para solicitar serviços!'
            signUpPage.noticeShouldBe(message)

        })

        afterEach(() => {
            cy.visit('/')
            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })
    })

    
    it('não deve cadastrar usuário com e-mail em duplicidade', () => {
        const user = data.user3
        cy.visit('/')
        cy.get('.signup').click()

        cy.get('form h1').should('have.text', 'Faça seu cadastro')

        cy.createUser(user)

        signUpPage.go()
        signUpPage.submit(user.name, user.email, user.password)

        const message = 'Oops! E-mail já cadastrado.'
        signUpPage.noticeShouldBe(message)

    })

    it('campos obrigatórios', () =>{
        cy.visit('/')
            cy.get('.signup').click()

            cy.get('form h1').should('have.text', 'Faça seu cadastro')

            signUpPage.go()
            signUpPage.submit()
            signUpPage.requiredFields('Nome é obrigatório','E-mail é obrigatório', 'Senha é obrigatória')
    })

    context('Email inválido', () => {
    
        
            data.invemails.forEach((e) => {
            it(`não deve realizar o cadastro com email inválido: ${e}`, () => {
                cy.visit('/')
                cy.get('.signup').click()
    
                cy.get('form h1').should('have.text', 'Faça seu cadastro')
                signUpPage.go()
                signUpPage.submit('QaxTeste1',e, 'qax123')
                signUpPage.alertShouldBe('Informe um email válido')
           })
        })

    })
    context('Senha muito curta', () => {
            data.shortpass.forEach((p) => {
            it(`não deve realizar o cadastro com senha inválida: ${p}`, () => {
                cy.visit('/')
                cy.get('.signup').click()
    
                cy.get('form h1').should('have.text', 'Faça seu cadastro')
                signUpPage.go()
                signUpPage.submit('QaxTeste1','qax@qax.com', p)
                signUpPage.alertShouldBe('Pelo menos 6 caracteres')


            })
        })

    })


})