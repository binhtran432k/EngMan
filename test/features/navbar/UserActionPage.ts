import { Locator, Page } from "@playwright/test";

class UserActionPage {
  readonly page: Page;
  readonly btnLogout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnLogout = page.locator(".btnLogout");
  }

  async clickLogout() {
    this.btnLogout.click();
  }
}

export default UserActionPage;
