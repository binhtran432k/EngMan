import { Locator, Page } from "@playwright/test";

class LoginPage {
  readonly page: Page;
  readonly itself: Locator;
  readonly txtUsername: Locator;
  readonly lblUsernameFeedback: Locator;
  readonly txtPassword: Locator;
  readonly lblPasswordFeedback: Locator;
  readonly btnLogin: Locator;
  readonly btnRegisterNavigationLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itself = page.locator(".LoginForm");
    this.txtUsername = page.locator('.LoginForm [name="username"]');
    this.lblUsernameFeedback = page.locator(
      '.LoginForm [data-group="username"] .invalid-feedback'
    );
    this.txtPassword = page.locator('.LoginForm [name="password"]');
    this.lblPasswordFeedback = page.locator(
      '.LoginForm [data-group="password"] .invalid-feedback'
    );
    this.btnLogin = page.locator(".btnLogin");
    this.btnRegisterNavigationLink = page.locator(".btnRegisterNavigationLink");
  }

  async enterUsername(username: string) {
    await this.txtUsername.fill(username);
  }

  async getUsernameFeedback() {
    return await this.lblUsernameFeedback.textContent();
  }

  async enterPassword(password: string) {
    await this.txtPassword.fill(password);
  }

  async getPasswordFeedback() {
    return await this.lblPasswordFeedback.textContent();
  }

  async clickLoginButton() {
    await this.btnLogin.click();
  }

  async clickRegisterNavigationLink() {
    await this.btnRegisterNavigationLink.click();
  }
}

export default LoginPage;
