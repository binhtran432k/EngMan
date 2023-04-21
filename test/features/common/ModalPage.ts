import { Locator, Page } from "@playwright/test";

class ModalPage {
  readonly page: Page;
  readonly lblMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lblMessage = page.locator(".lblModalMessage");
  }

  async getMessage() {
    return this.lblMessage.textContent();
  }
}

export default ModalPage;
