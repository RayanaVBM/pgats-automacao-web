class Cadastro {

    preencherFormularioNovoUsuario() {
        const timestamp = new Date().getTime()

        cy.get('a[href$=login]').click()

        const signUpName = "Tester Ray QA"
        Cypress.env('signUpName', signUpName)

        cy.get('[data-qa="signup-name"]').type(Cypress.env('signUpName'))
        cy.get('[data-qa="signup-email"]').type(`tester-${timestamp}@qabrasil.com`)
        cy.get('[data-qa="signup-button"]').click()
        cy.get('#id_gender1').check()
        cy.get('[name="password"]').type('password123')
        cy.get('[data-qa="days"]').select('1')
        cy.get('[data-qa="months"]').select('January')
        cy.get('[data-qa="years"]').select('2000')
        cy.get('#newsletter').check()
        cy.get('#optin').check()
        cy.get('[data-qa="first_name"]').type('Test')
        cy.get('[data-qa="last_name"]').type('User')
        cy.get('[data-qa="company"]').type('Test Company')
        cy.get('[data-qa="address"]').type('123 Test St')
        cy.get('[data-qa="address2"]').type('Apt 4')
        cy.get('[data-qa="country"]').select('United States')
        cy.get('[data-qa="state"]').type('California')
        cy.get('[data-qa="city"]').type('Los Angeles')
        cy.get('[data-qa="zipcode"]').type('90001')
        cy.get('[data-qa="mobile_number"]').type('+1234567890')
        cy.get('[data-qa="create-account"]').click()
        cy.contains('[data-qa="account-created"]', 'Account Created!').should('be.visible')
        cy.get('[data-qa="continue-button"]').contains('Continue').click()


    }
    excluirConta() {
        cy.get('[href="/delete_account"]').contains('Delete Account').click()
    }

    iniciarCadastro() {
        cy.get('[data-qa="signup-name"]').type('QA Brasil5')
        cy.get('[data-qa="signup-email"]').type('MariJoaquina@testes.com.br')
        cy.get('[data-qa="signup-button"]').click()
    }

    preencherFormularioContactUs() {
        cy.get('[data-qa="name"]').type("Maria Joaquina Silva")
        cy.get('[data-qa="email"]').type("MariJoaquina@testes.com.br")
        cy.get('[data-qa="subject"]').type("Compras Atrasadas")
        cy.get('[data-qa="message"]').type("Compras Atrasadas, por favor ajude")
        cy.fixture('example.json').as('arquivo')
        cy.get('[name="upload_file"]').selectFile('@arquivo')
        cy.get('[data-qa="submit-button"]').click()
    }

    preencherFormularioInscricaoHomePage() {
        cy.get('#susbscribe_email')
            .scrollIntoView()
            .type("MariJoaquina@testes.com.br")

        cy.get('#subscribe').click()
    }
}

export default new Cadastro()