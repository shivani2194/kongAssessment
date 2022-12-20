const selectors = {
    email: 'input[data-testid="kong-auth-login-email"]',
    password: 'input[data-testid="kong-auth-login-password"]',
    loginButton: 'button[data-testid="kong-auth-login-submit"]',
    loginError: 'div[data-testid="kong-auth-error-message"]',
    profileName: 'div[data-testid="k-dropdown-trigger"]',
    pageTitle: 'div.d-flex.flex-column.mb-5',
    pageHeader: '.login-header',
    forgotPassword: 'a[data-testid="kong-auth-login-forgot-password-link"]',
}

export class login {
    static emailField() {
        return cy.get(selectors.email)
    }

    static passwordField() {
        return cy.get(selectors.password)
    }

    static loginButton() {
        return cy.get(selectors.loginButton)
    }

    static loginError() {
        return cy.get(selectors.loginError)
    }

    static profileName() {
        return cy.get(selectors.profileName)
    }

    static pageTitle() {
        return cy.get(selectors.pageTitle)
    }

    static pageHeader() {
        return cy.get(selectors.pageHeader)
    }

    static forgetPassword() {
        return cy.get(selectors.forgotPassword)
    }
}
