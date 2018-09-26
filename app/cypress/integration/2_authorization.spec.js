/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('/#/signin')

    cy.get('#email')
    .type('cypress@email.com').should('have.value', 'cypress@email.com')

    cy.get('#password')
    .type('cypress').should('have.value', 'cypress')

    cy.get('.form-signin').submit()
  })

  it('try to edit profile', () => {
    cy.get('.nav-item .dropdown-toggle').click()

    cy.get('.dropdown-menu .dropdown-item:first').click()

    cy.wait(500)

    cy.get('#first').clear()
    .type('Test').should('have.value', 'Test')

    cy.get('#last').clear()
    .type('User').should('have.value', 'User')

    cy.get('.form-edit-profile').submit()

    cy.get('.nav-item .dropdown-toggle em')
    .should('contain', 'Test')
  })

  it('try to logout', () => {
    cy.get('.nav-item .dropdown-toggle').click()

    cy.get('.dropdown-menu .dropdown-item:last').click()
  })
})
