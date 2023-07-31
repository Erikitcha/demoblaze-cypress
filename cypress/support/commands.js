// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  'isInMenu',
  (menuTitleSelector, menuNameSelector, closeButtonSelector) => {
    const MENU_TITLE = cy.get(menuTitleSelector);
    MENU_TITLE.contains(menuNameSelector);

    const CLOSE_SIGN_UP_BUTTON = cy.get(closeButtonSelector);
    CLOSE_SIGN_UP_BUTTON.click();
  }
);

Cypress.Commands.add(
  'fillAndSubmit',
  (registrationData, submitButtonSelector) => {
    Object.entries(registrationData).forEach(([selector, value]) => {
      cy.get(selector).type(value);
    });

    cy.get(submitButtonSelector).click();
  }
);

Cypress.Commands.add('blazeRequest', (endpoint, registrationData) => {
  cy.request('POST', `https://api.demoblaze.com/${endpoint}`, {
    username: registrationData.username,
    password: registrationData.password,
  }).then((response) => {
    return response;
  });
});
