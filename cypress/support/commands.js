import {login} from '../pages/login'

var loginCreds = Cypress.env("credentials")
// -- This is a parent command --
 Cypress.Commands.add('login', (email, password) => { login.emailField().type(loginCreds.email)
    login.passwordField().type(loginCreds.password)
    login.loginButton().click()
    cy.wait('@successfullLogin').then((res) => {
    cy.url().should('be.equal', 'https://cloud.konghq.com/us/runtime-manager')
  })
  login.profileName().should('contain', loginCreds.userName) })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })