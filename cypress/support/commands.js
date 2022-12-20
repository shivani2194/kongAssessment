import {login} from '../pages/login'
import {serviceHub} from '../pages/serviceHub'

var loginCreds = Cypress.env("credentials")
 Cypress.Commands.add('login', (email, password) => { login.emailField().type(loginCreds.email)
    login.passwordField().type(loginCreds.password)
    login.loginButton().click()
    cy.wait('@successfullLogin').then((res) => {
    cy.url().should('be.equal', 'https://cloud.konghq.com/us/runtime-manager')
    })
  })
//
//
// -- This is a child command --
Cypress.Commands.add('createService', () => {  serviceHub.serviceHub().click();
  serviceHub.pageHeading().should("contain", "Service Hub")
  serviceHub.createServiceButton().should("contain", "New service")
  serviceHub.createServiceButton().click()
  serviceHub.displayNameField().type(displayNameGenerator)
  serviceHub.descriptionField().type(`Description-${randomstring.generate(30)}`)
  serviceHub.saveButton().click({force:true}) })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })