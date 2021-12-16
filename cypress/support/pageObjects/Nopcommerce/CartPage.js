class CartPage {
  validateCartPageUrl() {
    cy.url().should("include", "cart");
  }
  acceptTermsAndClickOnCheckoutButton() {
    cy.get("#termsofservice").click();
    cy.get("#checkout").click();
  }
}

export default CartPage;
