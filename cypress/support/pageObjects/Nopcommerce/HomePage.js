class HomePage {
    clickOnTheLoginButton() {
      return cy.get(".ico-login").click();
    }
    clickOnTheRegisterButton() {
        return cy.get('.ico-register').click();
      }
    validateLogOutButtonVisible()
    {
        return cy.get(".ico-logout").should("be.visible");
    }
    searchForProduct(productName)
    {
        cy.get("#small-searchterms").type(productName);
        cy.get("[type='submit']").click();
    }
  }
  
  export default HomePage;
  