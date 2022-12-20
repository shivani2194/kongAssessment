import {serviceHub} from '../pages/serviceHub'
//import { serviceHubVar } from '../fixtures/serviceHub.json';

var loginCreds = Cypress.env("credentials")
const randomstring = require("randomstring");
let displayNameGenerator =`DisplayName-${randomstring.generate(3)}`


describe('Login', () => {

  beforeEach(() => {
    cy.intercept("GET", "/kauth/api/v1/client-config/").as("successfullLogin");
    cy.intercept("GET", "**/service_packages").as("serviceHub");
    cy.intercept('POST', "/konnect-api/api/v1/service_packages").as("createService")
    cy.visit("/");
    cy.login(loginCreds.email, loginCreds.password);
  });
  
  it('Should be able to create service', () => {
   serviceHub.serviceHub().click();
   serviceHub.pageHeading().should("contain", "Service Hub")
   serviceHub.createServiceButton().should("contain", "New service")
   serviceHub.createServiceButton().click()
   cy.url().should('contain',"/servicehub/create")
   serviceHub.pageHeading().should("contain", loginCreds.pageHeading)
   serviceHub.pageSubHeading().should("contain", loginCreds.pageSubHeading)
   serviceHub.displayNameField().type(displayNameGenerator)
   serviceHub.descriptionField().type(`Description-${randomstring.generate(30)}`)
   serviceHub.saveButton().click({force:true})
   //serviceHub.verifyServiceCreatedMessage().should("contain", "Created Service");
   
   cy.wait('@createService').then((res) => {
    let response = res
    console.log(response)
    cy.url().should('contain', response.response.body.id)
    });

    serviceHub.serviceName().should('contain.text',displayNameGenerator)
   })

   it('Save button should be disabled:until name and description field is empty', () => {
    serviceHub.serviceHub().click();
    serviceHub.pageHeading().should("contain", "Service Hub")
    serviceHub.createServiceButton().should("contain", "New service")
    serviceHub.createServiceButton().click()
    serviceHub.saveButton().should('be.disabled')
    })

    it('Should not be able to create service: with existing Display name', () => {
        let displayNameGenerator =`DisplayName-${randomstring.generate(3)}`;
        let descriptionGenerator =`Description-${randomstring.generate(30)}`;
        cy.createService(displayNameGenerator,descriptionGenerator )
        //serviceHub.saveButton().click({force:true})
        cy.wait('@createService').its("response.statusCode").should('eq', 201)
        serviceHub.serviceHubViaCreateService().click({force:true});
        serviceHub.createServiceButton().click()
        serviceHub.displayNameField().type(displayNameGenerator)
        serviceHub.saveButton().click({force:true})
        cy.wait('@createService').its("response.statusCode").should('eq', 409)
        serviceHub.duplicateNameError().should('contain',`Key (org_id, name)=(cdc11e8d-5bda-4821-a9ee-aeaa144b382e, ${displayNameGenerator}) already exists.`)
        })
}) 

describe('Login', () => {

  beforeEach(() => {
    cy.intercept("GET", "/kauth/api/v1/client-config/").as("successfullLogin");
    cy.intercept("GET", "**/service_packages").as("serviceHub");
    cy.intercept('POST', "/konnect-api/api/v1/service_packages").as("createService")
    cy.visit("/");
    cy.login(loginCreds.email, loginCreds.password);
  });

  it('Should be able to delete service', () => {
    
      
    let displayNameGenerator =`DisplayName-${randomstring.generate(3)}`;
        let descriptionGenerator =`Description-${randomstring.generate(30)}`;
        cy.createService(displayNameGenerator,descriptionGenerator )
        cy.wait('@createService').its("response.statusCode").should('eq', 201)
        serviceHub.serviceAction().click()
    
  })


})