import { Locator, Page } from "@playwright/test";

class LoginPage {
  readonly page: Page;
  readonly txtUsername: Locator;
  readonly txtPassword: Locator;
  readonly btnLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtUsername = page.locator(".txtUsername");
    this.txtPassword = page.locator(".txtPassword");
    this.btnLogin = page.locator(".btnLogin");
  }

  async enterUsername(username: string) {
    await this.txtUsername.fill(username);
  }

  async enterPassword(password: string) {
    await this.txtPassword.fill(password);
  }

  async clickLoginButton() {
    await this.btnLogin.click();
  }
}

export default LoginPage;
