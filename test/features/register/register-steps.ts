import { DataTable, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../custom-world";
import RegisterPage from "./RegisterPage";
import TableUtility from "../../utilities/TableUtility";

Then("tôi thấy biểu mẫu đăng ký", async function (this: ICustomWorld) {
  const registerPage = new RegisterPage(this.page!);
  expect(registerPage.itself).toBeVisible();
});

When(
  "tôi nhấn đường dẫn chuyển hướng về trang đăng nhập",
  async function (this: ICustomWorld) {
    const registerPage = new RegisterPage(this.page!);
    await registerPage.clickLoginNavigationLink();
  }
);

When(
  "tôi hiện thực tạo tài khoản với thông tin sau:",
  async function (this: ICustomWorld, form: DataTable) {
    const registerPage = new RegisterPage(this.page!);
    const formRecord = TableUtility.tableRawToRecord(form.raw());

    const firstName = formRecord["tên"];
    const lastName = formRecord["họ"];
    const username = formRecord["tên đăng nhập"];
    const password = formRecord["mật khẩu"];
    const retypePassword = formRecord["nhập lại mật khẩu"];

    firstName && (await registerPage.enterFirstName(firstName));
    lastName && (await registerPage.enterLastName(lastName));
    username && (await registerPage.enterUsername(username));
    password && (await registerPage.enterPassword(password));
    retypePassword && (await registerPage.enterRetypePassword(retypePassword));
  }
);

When("tôi nhấn nút tạo tài khoản", async function (this: ICustomWorld) {
  const registerPage = new RegisterPage(this.page!);
  await registerPage.clickCreateAccountButton();
});

Then(
  "Tôi thấy phản hồi tạo tài khoản với các trường không hợp lệ như sau:",
  async function (this: ICustomWorld, feedbacks: DataTable) {
    const registerPage = new RegisterPage(this.page!);
    const feedbackRecord = TableUtility.tableRawToRecord(feedbacks.raw());

    const firstNameFeedback = feedbackRecord["tên"];
    const lastNameFeedback = feedbackRecord["họ"];
    const usernameFeedback = feedbackRecord["tên đăng nhập"];
    const passwordFeedback = feedbackRecord["mật khẩu"];
    const retypePasswordFeedback = feedbackRecord["nhập lại mật khẩu"];

    firstNameFeedback &&
      expect(await registerPage.getFirstNameFeedback()).toBe(firstNameFeedback);
    lastNameFeedback &&
      expect(await registerPage.getLastNameFeedback()).toBe(lastNameFeedback);
    usernameFeedback &&
      expect(await registerPage.getUsernameFeedback()).toBe(usernameFeedback);
    passwordFeedback &&
      expect(await registerPage.getPasswordFeedback()).toBe(passwordFeedback);
    retypePasswordFeedback &&
      expect(await registerPage.getRetypePasswordFeedback()).toBe(
        retypePasswordFeedback
      );
  }
);
