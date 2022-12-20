const selectors = {
    serviceAction:'[data-testid="service-package-actions"]',
    heading: 'h1',
    serviceName:'div[data-testid="packageName"]',
    dateModified: '[data-testid="service-modified"]',
    dateCreated: '[data-testid="service-created"]',
    descriptionNameField:'[data-testid="service-context-descriptions"]',
    publishStatus: 'div[data-testid="publish-status"]',
    serviceKey: 'div[data-testid="copy-id"]',
    label:'section[data-testid="labels-list"]',

    //create Version
    createVersion: 'a[data-testid="new-service-version"]',
    versionName: '[name="version"]',
    runTimeGroup: '[data-testid="k-select-input"]',
    selectRunTimeGroup: 'button.selected',
    createVersionButton: 'button[data-testid="create-service-version-button"]'
}

export class servicePage {

    static  serviceAction() {
        return cy.get(selectors.serviceAction)
      }

    static pageHeading(){
        return cy.get(selectors.heading)
    }

    static serviceName(){
        return cy.get(selectors.serviceName)
    }

    static  dateModified() {
        return cy.get(selectors.dateModified)
      }

      static  dateCreated() {
        return cy.get(selectors.dateCreated)
      }

      static  descriptionNameField() {
        return cy.get(selectors.descriptionNameField)
      }

      static  publishStatus() {
        return cy.get(selectors.publishStatus)
      }

      static  serviceKey() {
        return cy.get(selectors.serviceKey)
      }

      static label() {
        return cy.get(selectors.label)
      }

      // Create version
      static createVersion() {
        return cy.get(selectors.createVersion)
      }

      static versionName() {
        return cy.get(selectors.versionName).last()
      }

      static runTimeGroup() {
        return cy.get(selectors.runTimeGroup).last()
      }

      static selectRunTimeGroup() {
        return cy.get(selectors.selectRunTimeGroup).last()
      }

      static createVersionButton() {
        return cy.get(selectors.createVersionButton).last()
      }
    
}