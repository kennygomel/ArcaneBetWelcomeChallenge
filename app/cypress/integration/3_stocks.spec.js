/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('/#/signin')

    cy.get('#email')
    .type('cypress@email.com').should('have.value', 'cypress@email.com')

    cy.get('#password')
    .type('cypress').should('have.value', 'cypress')

    cy.get('.form-signin').submit()

    cy.visit('/#/stock')
  })

  it('try to create stock', () => {

    cy.get('.btn-stock-add').click()

    cy.get('#name')
    .type('cypress stock').should('have.value', 'cypress stock')

    cy.get('#price')
    .type('10000').should('have.value', '10000')

    cy.get('#interest')
    .type('5').should('have.value', '5')

    cy.get('#duration')
    .type('10').should('have.value', '10')

    cy.get('.form-stock-edit').submit()

    cy.wait(500)

    cy.get('table tbody').find('tr').should('have.length', 1)

    cy.get('table .link-stock-view').click()

    cy.wait(500)

    cy.get('h1 span').should('contain', 'cypress stock')

    cy.get('#price').should('contain', `$10,000.00`)

    cy.get('#interest').should('contain', `5%`)

    cy.get('#duration').should('contain', `10 years`)
  })

  it('try to edit stock', () => {
    cy.get('table .btn-stock-edit').click()

    cy.get('#name').clear()
    .type('cypress stock x2').should('have.value', 'cypress stock x2')

    cy.get('#price').clear()
    .type('20000').should('have.value', '20000')

    cy.get('#interest').clear()
    .type('10').should('have.value', '10')

    cy.get('#duration').clear()
    .type('20').should('have.value', '20')

    cy.get('.form-stock-edit').submit()

    cy.wait(500)

    cy.get('table tbody').find('tr').should('have.length', 1)

    cy.get('table .link-stock-view').click()

    cy.wait(500)

    cy.get('h1 span').should('contain', 'cypress stock x2')

    cy.get('#price').should('contain', `$20,000.00`)

    cy.get('#interest').should('contain', `10%`)

    cy.get('#duration').should('contain', `20 years`)
  })

  it('try to delete stock', () => {
    cy.get('table .btn-stock-delete').click()

    cy.wait(500)

    cy.get('table tbody').find('tr').should('have.length', 0)
  })
})
