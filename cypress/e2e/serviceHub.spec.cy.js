import { createService } from '../pages/createService'
import { servicePage } from '../pages/servicePage'
import { deleteService } from '../pages/deleteService'

let loginCreds = Cypress.env('credentials')
const randomstring = require('randomstring')
let pageSubHeading =
    'Create a service to manage and proxy an existing API or publish to a portal. Services contain one or more versions.'
let displayNameGenerator = null
let descriptionGenerator = null
let today = null
let date = null

describe('Create Service', () => {
    beforeEach(() => {
        displayNameGenerator = `DisplayName-${randomstring.generate(3)}`
        descriptionGenerator = `Description-${randomstring.generate(30)}`
        cy.intercept('GET', '/kauth/api/v1/client-config/').as(
            'successfullLogin'
        )
        cy.intercept('GET', '**/service_packages').as('serviceHub')
        cy.intercept('POST', '/konnect-api/api/v1/service_packages').as(
            'createService'
        )
        cy.visit('/')
        cy.login(loginCreds.email, loginCreds.password)
    })

    it('Should be able to create service', () => {
        createService.serviceHub().click()
        createService.pageHeading().should('contain', 'Service Hub')
        createService.createServiceButton().should('contain', 'New service')
        createService.createServiceButton().click()
        cy.url().should('contain', '/servicehub/create')
        createService.pageHeading().should('contain', 'Create a Service')
        createService.pageSubHeading().should('contain', pageSubHeading)
        createService.displayNameField().type(displayNameGenerator)
        createService.descriptionField().type(descriptionGenerator)
        createService.saveButton().click()

        cy.wait('@createService').then((response) => {
            cy.url().should('contain', response.response.body.id)
        })

        servicePage.serviceName().should('contain.text', displayNameGenerator)
    })

    it('Save button should be disabled:until name and description field is empty', () => {
        createService.serviceHub().click()
        createService.pageHeading().should('contain', 'Service Hub')
        createService.createServiceButton().should('contain', 'New service')
        createService.createServiceButton().click()
        createService.saveButton().should('be.disabled')
    })

    it('Should not be able to create service: with existing Display name', () => {
        cy.createService(displayNameGenerator, descriptionGenerator)
        cy.wait('@createService').its('response.statusCode').should('eq', 201)
        createService.serviceHubViaCreateService().click()
        createService.createServiceButton().click()
        createService.displayNameField().type(displayNameGenerator)
        createService.saveButton().click()
        cy.wait('@createService').its('response.statusCode').should('eq', 409)
        createService
            .duplicateNameError()
            .should(
                'contain',
                `Key (org_id, name)=(cdc11e8d-5bda-4821-a9ee-aeaa144b382e, ${displayNameGenerator}) already exists.`
            )
    })
})

describe('Delete Service', () => {
    beforeEach(() => {
        displayNameGenerator = `DisplayName-${randomstring.generate(3)}`
        descriptionGenerator = `Description-${randomstring.generate(30)}`

        cy.intercept('GET', '/kauth/api/v1/client-config/').as(
            'successfullLogin'
        )
        cy.intercept('GET', '**/service_packages').as('serviceHub')
        cy.intercept('POST', '/konnect-api/api/v1/service_packages').as(
            'createService'
        )
        cy.intercept('DELETE', '**/api/v1/service_packages/**').as(
            'deleteService'
        )
        cy.intercept('POST', '**/api/service_versions').as('serviceVersion')
        cy.visit('/')
        cy.login(loginCreds.email, loginCreds.password)
        cy.createService(displayNameGenerator, descriptionGenerator)
        cy.wait('@createService').its('response.statusCode').should('eq', 201)
    })

    it('Should be able to delete service', () => {
        servicePage.serviceAction().click()
        deleteService.deleteService().click()
        deleteService
            .deleteModalHeader()
            .should('contain', `Delete Service: ${displayNameGenerator}`)
        deleteService
            .deleteModalMessage()
            .should('contain', 'Are you sure you want to delete this service?')
        deleteService.deletelButton().click()
        cy.wait('@deleteService').its('response.statusCode').should('eq', 200)
    })

    it('Should be able to cancel delete service', () => {
        servicePage.serviceAction().click()
        deleteService.deleteService().click()
        deleteService
            .deleteModalHeader()
            .should('contain', `Delete Service: ${displayNameGenerator}`)
        deleteService
            .deleteModalMessage()
            .should('contain', 'Are you sure you want to delete this service?')
        deleteService.deleteModalCancelButton().click()
        cy.url().should('contain', '/overview')
    })
})
describe('Service page', () => {
    beforeEach(() => {
        displayNameGenerator = `DisplayName-${randomstring.generate(3)}`
        descriptionGenerator = `Description-${randomstring.generate(30)}`

        cy.intercept('GET', '/kauth/api/v1/client-config/').as(
            'successfullLogin'
        )
        cy.intercept('GET', '**/service_packages').as('serviceHub')
        cy.intercept('POST', '/konnect-api/api/v1/service_packages').as(
            'createService'
        )
        cy.intercept('DELETE', '**/api/v1/service_packages/**').as(
            'deleteService'
        )
        cy.intercept('POST', '**/api/service_versions').as('serviceVersion')
        cy.visit('/')
        cy.login(loginCreds.email, loginCreds.password)
        cy.createService(displayNameGenerator, descriptionGenerator)
        cy.wait('@createService').its('response.statusCode').should('eq', 201)
    })

    it('Should be able to verify details for created service', () => {
        today = new Date()
        date = today.getDate()
        createService
            .displayNameField()
            .should('contain.text', displayNameGenerator)
        servicePage.serviceKey().should('contain.text', displayNameGenerator)
        servicePage
            .descriptionNameField()
            .should('contain.text', descriptionGenerator)
        servicePage.label().should('contain.text', 'None')
        servicePage.dateModified().should('contain.text', date)
        servicePage.dateCreated().should('contain.text', date)
        servicePage.publishStatus().should('contain.text', 'Unpublished')
    })

    it('Should be able to create service Version', () => {
        servicePage.createVersion().click()
        cy.url().should('contain', '/versions/create')
        servicePage.pageHeading().should('contain', 'Create a Version')
        servicePage
            .versionName()
            .type(`Version Name-${randomstring.generate(5)}`)
        servicePage.runTimeGroup().click()
        servicePage.selectRunTimeGroup().click()
        servicePage.createVersionButton().click()
        cy.wait('@serviceVersion').its('response.statusCode').should('eq', 201)
    })
})
