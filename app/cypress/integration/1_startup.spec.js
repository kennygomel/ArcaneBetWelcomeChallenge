/// <reference types="Cypress" />

context('Actions', () => {
  it('stock productivity calculator test', () => {
    cy.visit('/')

    cy.get('#price')
    .type('10000').should('have.value', '10000')

    cy.get('#interest')
    .type('5').should('have.value', '5')

    cy.get('#duration')
    .type('10').should('have.value', '10')

    cy.wait(500)

    const profit = (10000 * Math.pow(1 + (5 / 100), 10)).toFixed(2)

    cy.get('h3')
    .should('contain', `Approximately profit: $${profit}`)
  })

  it('try to sign up', () => {
    cy.visit('/#/signup')
    cy.get('#email')
    .type('cypress@email.com').should('have.value', 'cypress@email.com')

    cy.get('#password')
    .type('cypress').should('have.value', 'cypress')

    cy.get('#passwordConfirmation')
    .type('cypress').should('have.value', 'cypress')

    cy.get('.form-signup').submit()

    cy.get('.nav-item .dropdown-toggle em')
    .should('contain', 'User')
  })
})
