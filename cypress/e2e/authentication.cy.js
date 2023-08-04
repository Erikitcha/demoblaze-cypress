
const { faker } = require('@faker-js/faker');

const registrationData = {
  username: faker.internet.email(),
  password: faker.internet.password(),
};

describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/index.html');
  });

  context('Registration', () => {
    beforeEach(() => {
      const SIGN_UP_BUTTON = cy.get('#signin2');
      SIGN_UP_BUTTON.click();

      cy.wait(1000);
    });

    it('Is in registration menu', () => {
      cy.isInMenu(
        '#signInModalLabel',
        'Sign',
        '#signInModal > .modal-dialog > .modal-content > .modal-header > .close > span'
      );
    });

    it('Fill registration fields', () => {
      const registrationCampsSelector = {
        '#sign-username': registrationData.username,
        '#sign-password': registrationData.password,
      };

      cy.fillAndSubmit(
        registrationCampsSelector,
        '#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary'
      );
    });

    it('Check if user was created succesfuly', () => {
      cy.blazeRequest('signup', registrationData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.empty;
      });
    });

    it('Check if user already exists', () =>{
      cy.blazeRequest('signup', registrationData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.errorMessage).to.equal("This user already exist.");
      });
    })
  });

  context('Login', () => {
    beforeEach(() => {
      const LOGIN_BUTTON = cy.get('#login2');
      LOGIN_BUTTON.click();

      cy.wait(1000);
    });

    it('Is in login menu', () => {
      cy.isInMenu(
        '#logInModalLabel',
        'Log',
        '#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary'
      );
    });

    it('Fill login fields', () => {
      const loginCampsSelector = {
        '#loginusername': registrationData.username,
        '#loginpassword': registrationData.password,
      };

      cy.fillAndSubmit(
        loginCampsSelector,
        '#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary'
      );
    });

    it('Check if login with wrong camps', () => {
      cy.blazeRequest('login', {
        //here we use absolutely anything that probably won't exist
        username: faker.commerce.productMaterial(),
        password: faker.internet.password(),
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.errorMessage).to.include('User does not exist');
      });
    }); 

    it('Check if login with correct camps', () => {
      cy.blazeRequest('login', registrationData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include('Auth_token:');
      });
    });
  });
});
