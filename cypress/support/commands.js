import { login } from '../pages/login'
import { createService } from '../pages/createService'

var loginCreds = Cypress.env('credentials')
Cypress.Commands.add('login', (email, password) => {
    login.emailField().type(loginCreds.email)
    login.passwordField().type(loginCreds.password)
    login.loginButton().click()
    cy.wait('@successfullLogin').then((res) => {
        cy.url().should('be.equal', 'https://cloud.konghq.com/us/overview')
    })
})

Cypress.Commands.add(
    'createService',
    (displayNameGenerator, descriptionGenerator) => {
        createService.serviceHub().click()
        createService.pageHeading().should('contain', 'Service Hub')
        createService.createServiceButton().should('contain', 'New service')
        createService.createServiceButton().click()
        createService.displayNameField().type(displayNameGenerator)
        createService.descriptionField().type(descriptionGenerator)
        createService.saveButton().click({ force: true })
    }
)
