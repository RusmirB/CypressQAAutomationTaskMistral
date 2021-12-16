class LoginPage {
  validateLoginPageUrl() {
    return cy.url().should("include", "login");
  }
  enterEmail(email)
    {
      return cy.get("#Email").type(email);
    }
  enterPassword(password)
  {
    return cy.get("#Password").type(password);
  }
  clickOnTheLoginButton()
  {
    return cy.get(".buttons").contains("Log in").click();
  }

  //shared steps
  loginWithEmailAndPassword(email, password)
  {
    this.enterEmail(email)
    this.enterPassword(password);
    this.clickOnTheLoginButton();
  }
  
}

export default LoginPage;
