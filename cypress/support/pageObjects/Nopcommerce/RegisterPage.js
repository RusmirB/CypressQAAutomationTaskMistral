class RegisterPage {
  //#region Locators and simple actions
  validateRegisterPageUrl() {
    return cy.url().should("include", "register");
  }
  selectMaleGender() {
    return cy.get("#gender-male").check().should("be.checked");
  }
  enterFirstName(firstName) {
    return cy.get("#FirstName").type(firstName);
  }
  enterLastName(lastName) {
    return cy.get("#LastName").type(lastName);
  }
  enterEmailAddress(emailAddress) {
    return cy.get("#Email").type(emailAddress);
  }
  enterPassword(password) {
    return cy.get("#Password").type(password);
  }
  confirmPassword(password) {
    return cy.get("#ConfirmPassword").type(password);
  }
  clickOnTheRegisterButton() {
    return cy.get("#register-button").click();
  }

  //#endregion

  //#region Shared steps
  populateRegisterFormAndClickRegister(firstName, lastName, emailAddress, password ){
    this.selectMaleGender()
    this.enterFirstName(firstName)
    this.enterLastName(lastName)
    this.enterEmailAddress(emailAddress)
    this.enterPassword(password)
    this.confirmPassword(password)
    this.clickOnTheRegisterButton()
  }
  //#endregion
}

export default RegisterPage;
