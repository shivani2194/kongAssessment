const selectors = {
    serviceHub: 'li[data-testid="sidebar-item-service-hub"]',
    serviceHubViaCreateService: '[href="/us/servicehub"]>.sidebar-item-display',
    heading: 'h1',
    createNewServiceButton: 'a[data-testid="new-service"]',
    pageSubHeading: 'div.form-container',
    displayNameField: '[data-testid="service-display-name"]',
    descriptionField: '[data-testid="service-description"]',
    saveButton: 'button[data-testid="save-service-button"]',
    cancelButton: 'button[data-testid="cancel-service-button"]',
    createdServiceMessage: '.message',
    duplicateNameError: 'div.k-alert-msg',
}

export class createService {
    static serviceHub() {
        return cy.get(selectors.serviceHub)
    }

    static serviceHubViaCreateService() {
        return cy.get(selectors.serviceHubViaCreateService)
    }

    static pageHeading() {
        return cy.get(selectors.heading)
    }

    static createServiceButton() {
        return cy.get(selectors.createNewServiceButton)
    }

    static pageSubHeading() {
        return cy.get(selectors.pageSubHeading)
    }

    static displayNameField() {
        return cy.get(selectors.displayNameField)
    }

    static descriptionField() {
        return cy.get(selectors.descriptionField)
    }

    static saveButton() {
        return cy.get(selectors.saveButton)
    }

    static cancelButton() {
        return cy.get(selectors.cancelButton)
    }

    static verifyServiceCreatedMessage() {
        return cy.get(selectors.createdServiceMessage)
    }

    static duplicateNameError() {
        return cy.get(selectors.duplicateNameError)
    }
}
