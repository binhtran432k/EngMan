import { Locator, Page } from "@playwright/test";

class NavbarPage {
  readonly page: Page;
  readonly btnUserAction: Locator;
  readonly btnLoginNavigation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnUserAction = page.locator(".btnUserMenuToggle");
    this.btnLoginNavigation = page.locator(".btnLoginNavigation");
  }

  async clickUserMenu() {
    this.btnUserAction.click();
  }

  async clickLoginNavigation() {
    this.btnLoginNavigation.click();
  }
}

export default NavbarPage;
