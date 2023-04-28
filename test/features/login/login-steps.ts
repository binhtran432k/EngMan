import { DataTable, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../custom-world";
import LoginPage from "./LoginPage";
import TableUtility from "../../utilities/TableUtility";

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

When(
  "tôi nhấn đường dẫn chuyển hướng về trang đăng ký",
  async function (this: ICustomWorld) {
    const loginPage = new LoginPage(this.page!);
    await loginPage.clickRegisterNavigationLink();
  }
);

Then("tôi thấy biểu mẫu đăng nhập", async function (this: ICustomWorld) {
  const loginPage = new LoginPage(this.page!);
  expect(loginPage.itself).toBeVisible();
});

Then(
  "Tôi thấy phản hồi đăng nhập với các trường không hợp lệ như sau:",
  async function (this: ICustomWorld, feedbacks: DataTable) {
    const loginPage = new LoginPage(this.page!);
    const feedbackRecord = TableUtility.tableRawToRecord(feedbacks.raw());

    const usernameFeedback = feedbackRecord["tên đăng nhập"];
    const passwordFeedback = feedbackRecord["mật khẩu"];

    usernameFeedback &&
      expect(await loginPage.getUsernameFeedback()).toBe(usernameFeedback);
    passwordFeedback &&
      expect(await loginPage.getPasswordFeedback()).toBe(passwordFeedback);
  }
);
