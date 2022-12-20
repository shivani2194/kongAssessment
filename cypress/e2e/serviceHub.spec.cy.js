import {createService} from '../pages/createService'
import { servicePage } from '../pages/servicePage';
import {deleteService} from '../pages/deleteService'
//import { serviceHubVar } from '../fixtures/serviceHub.json';

var loginCreds = Cypress.env("credentials")
const randomstring = require("randomstring");
let displayNameGenerator =`DisplayName-${randomstring.generate(3)}`


  describe('Create Service', () => {

    beforeEach(() => {
      cy.intercept("GET", "/kauth/api/v1/client-config/").as("successfullLogin");
      cy.intercept("GET", "**/service_packages").as("serviceHub");
      cy.intercept('POST', "/konnect-api/api/v1/service_packages").as("createService");
      cy.visit("/");
      cy.login(loginCreds.email, loginCreds.password);
    });
    
    it('Should be able to create service', () => {
      createService.serviceHub().click();
      createService.pageHeading().should("contain", "Service Hub");
      createService.createServiceButton().should("contain", "New service");
      createService.createServiceButton().click();
      cy.url().should('contain',"/servicehub/create");
      createService.pageHeading().should("contain", loginCreds.pageHeading);
      createService.pageSubHeading().should("contain", loginCreds.pageSubHeading);
      createService.displayNameField().type(displayNameGenerator);
      createService.descriptionField().type(`Description-${randomstring.generate(30)}`);
      createService.saveButton().click({force:true});
    
    cy.wait('@createService').then((res) => {
      let response = res
      cy.url().should('contain', response.response.body.id);
      });
      
      servicePage.serviceName().should('contain.text', displayNameGenerator);
    })

    it('Save button should be disabled:until name and description field is empty', () => {
      createService.serviceHub().click();
      createService.pageHeading().should("contain", "Service Hub");
      createService.createServiceButton().should("contain", "New service");
      createService.createServiceButton().click();
      createService.saveButton().should('be.disabled');
      })

      it('Should not be able to create service: with existing Display name', () => {
          let displayNameGenerator =`DisplayName-${randomstring.generate(3)}`;
          let descriptionGenerator =`Description-${randomstring.generate(30)}`;
          cy.createService(displayNameGenerator,descriptionGenerator);
          cy.wait('@createService').its("response.statusCode").should('eq', 201);
          createService.serviceHubViaCreateService().click({force:true});
          createService.createServiceButton().click();
          createService.displayNameField().type(displayNameGenerator);
          createService.saveButton().click({force:true});
          cy.wait('@createService').its("response.statusCode").should('eq', 409);
          createService.duplicateNameError().should('contain',`Key (org_id, name)=(cdc11e8d-5bda-4821-a9ee-aeaa144b382e, ${displayNameGenerator}) already exists.`);
          })
  }) 

  describe('Delete Service', () => {

    beforeEach(() => {
      cy.intercept("GET", "/kauth/api/v1/client-config/").as("successfullLogin");
      cy.intercept("GET", "**/service_packages").as("serviceHub");
      cy.intercept('POST', "/konnect-api/api/v1/service_packages").as("createService");
      cy.intercept("DELETE", "**/api/v1/service_packages/**").as("deleteService");
      cy.intercept('POST', "**/api/service_versions").as("serviceVersion");
      cy.visit("/");
      cy.login(loginCreds.email, loginCreds.password);
    });

    it('Should be able to delete service', () => {
        var today = new Date();
        var dd = today.getDate();
        let displayNameGenerator =`DisplayName-${randomstring.generate(3)}`;
        let descriptionGenerator =`Description-${randomstring.generate(30)}`;
        cy.createService(displayNameGenerator,descriptionGenerator);
        cy.wait('@createService').its("response.statusCode").should('eq', 201);
        servicePage.serviceAction().click();
        deleteService.deleteService().click();
        deleteService.deleteModalHeader().should('contain',`Delete Service: ${displayNameGenerator}`);
        deleteService.deleteModalMessage().should('contain', loginCreds.deleteModalMessage);
        deleteService.deletelButton().click();
        cy.wait('@deleteService').its("response.statusCode").should('eq', 200);
        //assert against confirmation pop up
     })

    it('Should be able to cancel delete service', () => {
          let displayNameGenerator =`DisplayName-${randomstring.generate(3)}`;
          let descriptionGenerator =`Description-${randomstring.generate(30)}`;
          cy.createService(displayNameGenerator,descriptionGenerator);
          cy.wait('@createService').its("response.statusCode").should('eq', 201);
          servicePage.serviceAction().click();
          deleteService.deleteService().click();
          deleteService.deleteModalHeader().should('contain',`Delete Service: ${displayNameGenerator}`);
          deleteService.deleteModalMessage().should('contain', loginCreds.deleteModalMessage);
          deleteService.deleteModalCancelButton().click();
          cy.url().should('contain','/overview');
       })

      it('Should be able to verify details for created service', () => {
            var today = new Date();
            var date = today.getDate();
            let displayNameGenerator =`DisplayName-${randomstring.generate(3)}`;
            let descriptionGenerator =`Description-${randomstring.generate(30)}`;
            cy.createService(displayNameGenerator,descriptionGenerator );
            cy.wait('@createService').its("response.statusCode").should('eq', 201);
            createService.displayNameField().should('contain.text', displayNameGenerator);
            servicePage.serviceKey().should('contain.text', displayNameGenerator);
            servicePage.descriptionNameField().should('contain.text', descriptionGenerator);
            servicePage.label().should('contain.text', "None");
            servicePage.dateModified().should('contain.text', date);
            servicePage.dateCreated().should('contain.text', date);
            servicePage.publishStatus().should('contain.text',"Unpublished");
       })

      it('Should be able to create service Version', () => {
            let displayNameGenerator =`DisplayName-${randomstring.generate(3)}`;
            let descriptionGenerator =`Description-${randomstring.generate(30)}`;
            cy.createService(displayNameGenerator,descriptionGenerator);
            cy.wait('@createService').its("response.statusCode").should('eq', 201);
            servicePage.createVersion().click();
            cy.url().should('contain', '/versions/create');
            servicePage.pageHeading().should('contain', loginCreds.createVersion);
            servicePage.versionName().type(`Version Name-${randomstring.generate(5)}`);
            servicePage.runTimeGroup().click();
            servicePage.selectRunTimeGroup().click();
            servicePage.createVersionButton().click();
            cy.wait('@serviceVersion').its("response.statusCode").should('eq', 201);
       })
})