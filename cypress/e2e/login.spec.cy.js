import { login } from '../pages/login'

var loginCreds = Cypress.env('credentials')

describe('Login', () => {
    beforeEach(() => {
        cy.intercept('GET', '/kauth/api/v1/client-config/').as(
            'successfullLogin'
        )
        cy.intercept('POST', '/kauth/api/v1/authenticate').as('invalidLogin')
        cy.visit('/')
    })

    it('Should be able to login with valid credentials', () => {
        login.pageTitle().should('contain', loginCreds.loginTitle)
        login.pageHeader().should('contain', 'Login')
        login.emailField().type(loginCreds.email)
        login.passwordField().type(loginCreds.password)
        login.loginButton().click()
        cy.wait('@successfullLogin').then((res) => {
            cy.url().should(
                'be.equal',
                'https://cloud.konghq.com/us/runtime-manager'
            )
        })
        login.profileName().should('contain', loginCreds.userName)
    })

    it('Should not be able to login with invalid Email', () => {
        login.emailField().type('randomInvalid@email.com')
        login.passwordField().type(loginCreds.password)
        login.loginButton().click()
        cy.wait('@invalidLogin').its('response.statusCode').should('eq', 401)
        login.loginError().should('contain', loginCreds.loginError)
    })

    it('Should be able to login with valid credentials', () => {
        login.emailField().type(loginCreds.email)
        login.passwordField().type('r@ndomInvalid')
        login.loginButton().click()
        cy.wait('@invalidLogin').its('response.statusCode').should('eq', 401)
        login.loginError().should('contain', loginCreds.loginError)
    })

    it('Should not be able to login with blank credential fields', () => {
        login.loginButton().should('be.disabled')
    })

    it('Should not be able to login with blank email field', () => {
        login.passwordField().type(loginCreds.password)
        login.loginButton().should('be.disabled')
    })

    it('Should not be able to login with blank password', () => {
        login.emailField().type(loginCreds.email)
        login.loginButton().should('be.disabled')
    })

    it.only('Should be able to click on forget password link', () => {
        login.emailField().type(loginCreds.email)
        login.loginButton().should('be.disabled')
        login.forgetPassword().click()
        cy.url().should('contain', '/forgot-password')
    })
})

//update name of logincreds
