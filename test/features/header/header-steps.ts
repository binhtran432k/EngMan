import { When } from "@cucumber/cucumber";
import { ICustomWorld } from "../custom-world";
import HeaderPage from "./HeaderPage";
import UserMenuPage from "./UserMenuPage";

When("tôi nhấn vào nút người dùng", async function (this: ICustomWorld) {
  const navbarPage = new HeaderPage(this.page!);
  await navbarPage.clickUserMenu();
});

When("tôi nhấn vào đăng xuất", async function (this: ICustomWorld) {
  const userActionPage = new UserMenuPage(this.page!);
  await userActionPage.clickLogout();
});

When("tôi nhấn vào nút chuyển hướng đăng nhập", async function () {
  const navbarPage = new HeaderPage(this.page!);
  await navbarPage.clickLoginNavigation();
});
