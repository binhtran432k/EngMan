import { Locator, Page } from "@playwright/test";

class RegisterPage {
  readonly page: Page;
  readonly itself: Locator;
  readonly txtFirstName: Locator;
  readonly txtLastName: Locator;
  readonly txtUsername: Locator;
  readonly txtPassword: Locator;
  readonly txtRetypePassword: Locator;
  readonly lblFirstNameFeedback: Locator;
  readonly lblLastNameFeedback: Locator;
  readonly lblUsernameFeedback: Locator;
  readonly lblPasswordFeedback: Locator;
  readonly lblRetypePasswordFeedback: Locator;
  readonly btnCreateAccount: Locator;
  readonly btnLoginNavigationLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itself = page.locator(".RegisterForm");

    this.txtFirstName = page.locator('.RegisterForm [name="firstName"]');
    this.txtLastName = page.locator('.RegisterForm [name="lastName"]');
    this.txtUsername = page.locator('.RegisterForm [name="username"]');
    this.txtPassword = page.locator('.RegisterForm [name="password"]');
    this.txtRetypePassword = page.locator(
      '.RegisterForm [name="retypePassword"]'
    );

    this.lblFirstNameFeedback = page.locator(
      '.RegisterForm [data-group="firstName"] .invalid-feedback'
    );
    this.lblLastNameFeedback = page.locator(
      '.RegisterForm [data-group="lastName"] .invalid-feedback'
    );
    this.lblUsernameFeedback = page.locator(
      '.RegisterForm [data-group="username"] .invalid-feedback'
    );
    this.lblPasswordFeedback = page.locator(
      '.RegisterForm [data-group="password"] .invalid-feedback'
    );
    this.lblRetypePasswordFeedback = page.locator(
      '.RegisterForm [data-group="retypePassword"] .invalid-feedback'
    );

    this.btnCreateAccount = page.locator(".btnCreateAccount");
    this.btnLoginNavigationLink = page.locator(".btnLoginNavigationLink");
  }

  async enterFirstName(text: string) {
    await this.txtFirstName.fill(text);
  }

  async enterLastName(text: string) {
    await this.txtLastName.fill(text);
  }

  async enterUsername(text: string) {
    await this.txtUsername.fill(text);
  }

  async enterPassword(text: string) {
    await this.txtPassword.fill(text);
  }

  async enterRetypePassword(text: string) {
    await this.txtRetypePassword.fill(text);
  }

  async getFirstNameFeedback() {
    return await this.lblFirstNameFeedback.textContent();
  }

  async getLastNameFeedback() {
    return await this.lblLastNameFeedback.textContent();
  }

  async getUsernameFeedback() {
    return await this.lblUsernameFeedback.textContent();
  }

  async getPasswordFeedback() {
    return await this.lblPasswordFeedback.textContent();
  }

  async getRetypePasswordFeedback() {
    return await this.lblRetypePasswordFeedback.textContent();
  }

  async clickCreateAccountButton() {
    await this.btnCreateAccount.click();
  }

  async clickLoginNavigationLink() {
    await this.btnLoginNavigationLink.click();
  }
}

export default RegisterPage;
