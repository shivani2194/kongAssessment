const selectors = {
    deleteService: '[data-testid="delete-service"]',
    deleteModalHeader: '.k-prompt-header-content',
    deleteModalMessage: '.k-prompt-body-content>:nth-child(1)',
    deleteButton: '.k-prompt-action-buttons > .danger',
    deleteModalCancelButton: '.k-prompt-action-buttons>.outline'
}

export class deleteService{

    static  deleteService() {
        return cy.get(selectors.deleteService)
      }

      static  deleteModalHeader() {
        return cy.get(selectors.deleteModalHeader)
      }

      static  deleteModalMessage() {
        return cy.get(selectors.deleteModalMessage)
      }

      static  deletelButton() {
        return cy.get(selectors.deleteButton)
      }

      static  deleteModalCancelButton() {
        return cy.get(selectors.deleteModalCancelButton)
      }
}