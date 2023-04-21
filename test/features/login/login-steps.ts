import { Then, When } from "@cucumber/cucumber";
import { ICustomWorld } from "../custom-world";
import LoginPage from "./LoginPage";
import { expect } from "@playwright/test";

When(
  "tôi hiện thực đăng nhập với tài khoản {string} và mật khẩu {string}",
  async function (this: ICustomWorld, username: string, password: string) {
    const loginPage = new LoginPage(this.page!);
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
  }
);

When("tôi nhấn nút đăng nhập", async function (this: ICustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.clickLoginButton();
});

Then("tôi thấy biểu mẫu đăng nhập", async function (this: ICustomWorld) {
  const loginPage = new LoginPage(this.page!);
  expect(loginPage.txtUsername!).toBeVisible();
  expect(loginPage.txtPassword!).toBeVisible();
  expect(loginPage.btnLogin!).toBeVisible();
});
