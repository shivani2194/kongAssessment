const selectors = {
    email: 'input[data-testid="kong-auth-login-email"]',
    password: 'input[data-testid="kong-auth-login-password"]',
    loginButton: 'button[data-testid="kong-auth-login-submit"]',
    loginError: 'p.text-error'
 
}
 
export class login {
 
   static emailField(){
        return cy.get(selectors.email)
    }

    static passwordField(){
        return cy.get(selectors.password)
    }

    static loginButton(){
        return cy.get(selectors.loginButton)
    }
}