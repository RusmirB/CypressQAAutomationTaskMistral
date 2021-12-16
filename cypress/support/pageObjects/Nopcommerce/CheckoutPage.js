class CheckoutPage {
  validateCheckoutPageUrl() {
    cy.url().should("include", "checkout");
  }
  populateBillingAddressOrClickContinueIfPopulated(country, state, city, address, postalCode, phoneNumber){
    cy.get("#BillingNewAddress_FirstName").then(($input) => {
      if ($input.is(":visible")) {
        cy.get("#BillingNewAddress_CountryId").select(country);
        cy.get("#BillingNewAddress_StateProvinceId").select(
          state
        );
        cy.get("#BillingNewAddress_City").type(city);
        cy.get("#BillingNewAddress_Address1").type(address);
        cy.get("#BillingNewAddress_ZipPostalCode").type(
          postalCode
        );
        cy.get("#BillingNewAddress_PhoneNumber").type(
          phoneNumber
        );
        cy.get(".buttons").contains("Continue").click();
      } else {
        cy.get(".buttons").contains("Continue").click();
      }
    });
  }
  selectShippingMethodAndContinue(){
    cy.get("#shippingoption_1").check().should("be.checked");
    cy.get("#shipping-method-buttons-container > .button-1").click();
  }
  populateCreditCardInfoAndContinue(fullName, creditCardNumber, cvc, expirationMonth, expirationYear)
  {
    cy.get("#paymentmethod_1").check().should("be.checked");
    cy.get("#payment-method-buttons-container > .button-1").click();
    cy.get("#CardholderName").type(fullName);
    cy.get("#CardNumber").type(creditCardNumber);
    cy.get("#CardCode").type(cvc);
    cy.get("#ExpireMonth").select(expirationMonth);
    cy.get("#ExpireYear").select(expirationYear);
    cy.get("#payment-info-buttons-container > .button-1").click();
  }
  validateProductNameOnConfirmationScreen(deviceName){
    cy.get('.product-name').should("have.text", deviceName);

  }
  clickConfirmOrderButton(){
    cy.get('#confirm-order-buttons-container > .button-1').click();

  }
  validateOrderProcessedSuccesfullyMessage(){
    cy.get('.section > .title > strong').should("have.text", "Your order has been successfully processed!")
  }
}

export default CheckoutPage;
