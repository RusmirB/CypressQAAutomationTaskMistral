class SearchPage {
  clickOnAddToCartButton() {
    return cy.get(".product-box-add-to-cart-button").click();
  }
  clickOnShoppingCartButton() {
    return cy.get(".cart-label").click();
  }
}

export default SearchPage;
