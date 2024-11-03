class Menu {

    irParaProdutos(){
        cy.get('[href="/products"]').click()
    }

    irParaLoginOuCadastroUsuario(){
        cy.get('[href="/login"]').click()
    }

    irParaLogout(){
        cy.get('[href="/logout"]').click();
    }

    irParaContactUs(){
    cy.get('[href="/contact_us"]').click();
    }
    
}
export default new Menu()