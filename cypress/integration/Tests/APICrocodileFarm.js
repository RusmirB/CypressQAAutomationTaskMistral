/// <reference types="Cypress"/>

const apiEndpoint = Cypress.env("baseApiUrl");
const uniqueNumber = Date.now().toString();
let token;
let crocodileID;

describe("My API Suite", function () {
  //hooks before each test
  beforeEach(function () {
    cy.fixture("APICrocodileFarm").then(function (testdata) {
      this.testdata = testdata;
    });
  });

  it("Authentication credentials are not provided - 401 error", function () {
    cy.request({
      method: "GET",
      url: apiEndpoint + "/my/crocodiles/",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property(
        "detail",
        "Authentication credentials were not provided."
      );
    });
  });

  it("CRUD Crocodile farm", function () {
    let userName = this.testdata.username + uniqueNumber;
    let firstName = this.testdata.firstName;
    let lastName = this.testdata.lastName + uniqueNumber;
    let emailAddress = uniqueNumber + this.testdata.email;
    let password = this.testdata.password;
    //create user
    cy.request({
      method: "POST",
      url: apiEndpoint + "/user/register/",
      body: {
        username: userName,
        first_name: firstName,
        last_name: lastName,
        email: emailAddress,
        password: password,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      cy.log(JSON.stringify(response.body));
    });

    //login via username and password - get token
    cy.request({
      method: "POST",
      url: apiEndpoint + "/auth/token/login/",
      form: true,
      body: {
        username: userName,
        password: password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(JSON.stringify(response.body));
      cy.log(response.body.access);
      token = response.body.access;

      //create crocodile and get ID
      cy.request({
        method: "POST",
        url: apiEndpoint + "/my/crocodiles/",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: {
          name: "Crocodile",
          sex: "M",
          date_of_birth: this.testdata.birthday,
          username: userName,
          password: password,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        cy.log(JSON.stringify(response.body));
        cy.log(JSON.stringify(response.body.id));
        crocodileID = response.body.id;
        //Get single crocodile
        cy.request({
          method: "GET",
          url: apiEndpoint + "/my/crocodiles/" + crocodileID + "/",

          headers: {
            Authorization: "Bearer " + token,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          cy.log(JSON.stringify(response.body));
        });

        //update name
        cy.request({
          method: "PATCH",
          url: apiEndpoint + "/my/crocodiles/" + crocodileID + "/",

          headers: {
            Authorization: "Bearer " + token,
          },
          body: {
            name: "Updated",
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          cy.log(JSON.stringify(response.body));
          expect(response.body.name).to.eq("Updated");
        });

        //Get crocodile - validate updated name
        cy.request({
            method: "GET",
            url: apiEndpoint + "/my/crocodiles/" + crocodileID + "/", 
            headers: {
              Authorization: "Bearer " + token,
            },
          }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
            expect(response.body.name).to.eq("Updated");
          });
      });
    });
  });
});
