import {login} from '../support/login'

var loginCreds = Cypress.env("credentials")


describe('Login', () => {
  
  it('Should be able to login with valid credentials', () => {
    cy.intercept('GET', '/kauth/api/v1/client-config/').as('login')
    cy.visit('/')
    login.emailField().type(loginCreds.email)
    console.log(emailId)
    login.passwordField().type(password)
    login.loginButton().click()
    cy.wait('@login').then((res) => {
    cy.url().should('be.equal', 'https://cloud.konghq.com/us/runtime-manager')
  })
})
})