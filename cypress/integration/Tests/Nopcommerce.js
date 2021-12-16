/// <reference types="Cypress"/>
import HomePage from "../../support/pageObjects/Nopcommerce/HomePage";
import LoginPage from "../../support/pageObjects/Nopcommerce/LoginPage";
import SearchPage from "../../support/pageObjects/Nopcommerce/SearchPage";
import RegisterPage from "../../support/pageObjects/Nopcommerce/RegisterPage";
import CartPage from "../../support/pageObjects/Nopcommerce/CartPage";
import CheckoutPage from "../../support/pageObjects/Nopcommerce/CheckoutPage";

describe("My NopCommmerce Suite", function () {
  beforeEach(function () {
    //open url
    cy.visit(Cypress.env("url"));
    //clear cache
    cy.exec("npm cache clear --force");
    //get test data from fixtures
    cy.fixture("NopcommerceData").then(function (testdata) {
      this.testdata = testdata;
    });
  });

  it("Register user", function () {
    const homePage = new HomePage();
    const registerPage = new RegisterPage();

    //click on Register button
    homePage.clickOnTheRegisterButton();
    registerPage.validateRegisterPageUrl();
    registerPage.populateRegisterFormAndClickRegister(
      this.testdata.firstName,
      this.testdata.lastName,
      this.testdata.email,
      this.testdata.password
    );
  });

  it("Add to cart and proceed with checkout", function () {
    const homePage = new HomePage();
    const loginPage = new LoginPage();
    const searchPage = new SearchPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    //click on the Login button
    homePage.clickOnTheLoginButton();
    loginPage.validateLoginPageUrl();
    //login page - log in
    loginPage.loginWithEmailAndPassword(
      this.testdata.email,
      this.testdata.password
    );
    //home page
    homePage.validateLogOutButtonVisible();
    //search for product
    homePage.searchForProduct(this.testdata.deviceName);
    //search page - add to cart
    searchPage.clickOnAddToCartButton();
    //click on the shopping cart button
    searchPage.clickOnShoppingCartButton();
    //Cart Page
    cartPage.validateCartPageUrl();
    cartPage.acceptTermsAndClickOnCheckoutButton();
    //checkout page
    checkoutPage.validateCheckoutPageUrl();
    //billing address
    checkoutPage.populateBillingAddressOrClickContinueIfPopulated(
      this.testdata.country,
      this.testdata.state,
      this.testdata.city,
      this.testdata.address,
      this.testdata.postalCode,
      this.testdata.phoneNumber
    );
    //shipping adress
    checkoutPage.selectShippingMethodAndContinue();
    //payment method
    checkoutPage.populateCreditCardInfoAndContinue(
      this.testdata.fullName,
      this.testdata.creditCardNumber,
      this.testdata.cvc,
      this.testdata.expirationMonth,
      this.testdata.expirationYear
    );
    //confirm order
    checkoutPage.validateProductNameOnConfirmationScreen(
      this.testdata.deviceName
    );
    checkoutPage.clickConfirmOrderButton();
    checkoutPage.validateOrderProcessedSuccesfullyMessage();
  });
});
