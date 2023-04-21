import { When } from "@cucumber/cucumber";
import { ICustomWorld } from "../custom-world";
import NavbarPage from "./NavbarPage";
import UserActionPage from "./UserActionPage";

When("tôi nhấn vào đăng xuất", async function (this: ICustomWorld) {
  const navbarPage = new NavbarPage(this.page!);
  await navbarPage.clickUserAction();
  const userActionPage = new UserActionPage(this.page!);
  await userActionPage.clickLogout();
});

When("tôi nhấn vào nút chuyển hướng đăng nhập", async function () {
  const navbarPage = new NavbarPage(this.page!);
  await navbarPage.clickLoginNavigation();
});
