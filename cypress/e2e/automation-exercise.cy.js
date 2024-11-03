/// <reference types="cypress"/>
import cadastro from '../pages/cadastro'
import login from '../pages/login'
import menu from '../pages/menu'
import produtos from '../pages/produtos'

import { faker } from '@faker-js/faker'



describe('Automation Exercise', () => {
  beforeEach(() => {
    //Arrange
    cy.visit('/');
  });

  it('Teste Case 1: Cadastrar Usuario', () => {
    //Act
    const timestamp = new Date().getTime()
    cadastro.preencherFormularioNovoUsuario()
    //Assert
    cy.get('b').contains(Cypress.env('signUpName'))
    //Act 
    cadastro.excluirConta()
    //Assert
    cy.contains('b', 'Account Deleted!').should('be.visible')
  });

  it('Test Case 2:  Login User with correct email and password ', () => {
    //Arrange
    menu.irParaLoginOuCadastroUsuario()
    //Act 
    login.preencherLogin("MariJoaquina@testes.com.br", "teste123",)
    //Assert
    cy.contains('b', 'Maria Joaquina').should("be.visible")


  });

  it('Test Case 3:  Login User with incorrect email and password ', () => {
    //Arrange
    menu.irParaLoginOuCadastroUsuario()
    //Act 
    login.preencherLogin("MariJoeaquina@testes.com.br", "teste123e",)
    //Assert
    cy.contains('.login-form form p', 'Your email or password is incorrect!').should("be.visible")
  });

  it('Test Case 4: Logout User ', () => {
    menu.irParaLoginOuCadastroUsuario()
    //Arrange
    login.preencherLogin("MariJoaquina@testes.com.br", "teste123",)
    //Assert
    cy.contains('b', 'Maria Joaquina').should("be.visible")
    //Act 
    menu.irParaLogout()
    //Assert
    cy.url().should('contain', 'login')
    cy.contains("Login to your account").should("be.visible")
  });

  it('Test Case 5:  Register User with existing email ', () => {
    //Arrange
    menu.irParaLoginOuCadastroUsuario()
    //Act 
    cadastro.iniciarCadastro()
    //Assert
    cy.contains('.signup-form > form > p', 'Email Address already exist!').should("be.visible")
  });

  it('Test Case 6: Contact Us Form', () => {
    //Arrange
    menu.irParaContactUs()
    //Act 
    cadastro.preencherFormularioContactUs()
    //Assert
    cy.contains('.status', 'Success! Your details have been submitted successfully.').should("be.visible")
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    //Arrange
    menu.irParaProdutos()
    //Assert
    cy.url().should('contain', 'products')
    //Act 
    produtos.verDetalhesProdutos()
    //Assert
    cy.get('.product-information > h2').should('be.visible')
    cy.get('.product-information p').should('be.visible').and('have.length', 4)
    cy.get('.product-information  span span').should('be.visible')
  });

  it('Test Case 9: Search Product', () => {
    //Arrange
    menu.irParaProdutos()
    //Assert
    cy.url().should('contain', 'products')
    cy.contains('[class="title text-center"]', 'All Products').should("be.visible")
    //Act 
    produtos.pesquisarProdutos()
    //Assert
    cy.contains('[class="title text-center"]', 'Searched Products').should("be.visible")
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    //Act 
    cadastro.preencherFormularioInscricaoHomePage()
    //Assert
    cy.contains('You have been successfully subscribed!').should('be.visible')
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    //Act 
    const timestamp = new Date().getTime()
    cadastro.preencherFormularioNovoUsuario()
    //Assert
    cy.get('b').contains(Cypress.env('signUpName'))
    //Arrange
    menu.irParaProdutos()
    //Assert
    cy.url().should('contain', 'products')
    //Act 
    produtos.verDetalhesProdutos()
    //Assert
    cy.get('.product-information > h2').should('be.visible')
    cy.get('.product-information p').should('be.visible').and('have.length', 4)
    cy.get('.product-information  span span').should('be.visible')
     //Act
    produtos.adicionarProdutoAoCarrinho()
    //Assert
    cy.get('#cartModal > div > div > div.modal-body').contains('Your product has been added to cart.')
    //Act 
    produtos.acessarCarrinhoComprasModal()
    produtos.continuarCompra()
    produtos.continuarCompra()
    produtos.preencherDadosBancarios()
    //Assert
    cy.get('[data-qa="order-placed"]').contains('Order Placed!')
    //Act 
    cadastro.excluirConta()
    //Assert
    cy.contains('b', 'Account Deleted!').should('be.visible')


  });

});
