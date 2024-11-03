import { faker } from '@faker-js/faker'
class Produtos {

 verDetalhesProdutos(){
    cy.get('.single-products')
    .should('be.visible')
    .and('have.length.at.least', 1)
    .first()
    .parent()
    .contains('View Product')
    .click()
 }   
 pesquisarProdutos(){
    cy.get('[name="search"]').type("Shirt")
    cy.get('[class="btn btn-default btn-lg"]').click()
 } 

 adicionarProdutoAoCarrinho(){
    cy.get('[class="btn btn-default cart"]').click()
 }
 acessarCarrinhoComprasModal(){
    cy.get('[class="modal-content"] * u').click()
 }
 continuarCompra(){
    cy.get('[class="btn btn-default check_out"]').click()
 }
 preencherDadosBancarios(){
    cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
    cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
    cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
    cy.get('[data-qa="cvc"]').type(faker.finance.creditCardNumber())
    cy.get('[data-qa="expiry-month"]').type("12")
    cy.get('[data-qa="expiry-year"]').type("2024")
    cy.get('[data-qa="pay-button"]').click()
 }
}
export default new Produtos()