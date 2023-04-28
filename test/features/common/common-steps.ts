import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../custom-world";
import ModalPage from "./ModalPage";

interface User {
  username: string;
  password: string;
}

const PageMap: Record<string, string> = {
  "trang đăng nhập": "/login",
  "trang chủ": "/",
  "trang đăng ký": "/register",
} as const;

const defaultPassword = "12345678As";

const UserAccount = {
  default: {
    username: "student",
    password: defaultPassword,
  } as User,
  admin: {
    username: "admin",
    password: defaultPassword,
  } as User,
} as const;

const RoleMap: Record<string, keyof typeof UserAccount> = {
  "mặc định": "default",
  "quản trị viên": "admin",
} as const;

Given(
  "tôi đã đăng nhập vào hệ thống với quyền {string}",
  async function (this: ICustomWorld, roleName: string) {
    const role = RoleMap[roleName] ?? "default";
    const path = role === "default" ? "auth" : "auth/admin";
    const res = await this.server?.post(path, { data: UserAccount.default });
    if (!res?.ok()) {
      return;
    }
    const data = await res.json();
    if (!data) {
      return;
    }
    await this.context?.addInitScript((token) => {
      window.localStorage.setItem("token", token);
    }, data.token);
  }
);

Given("tôi chưa đăng nhập vào hệ thống", async function (this: ICustomWorld) {
  await this.context?.addInitScript(() => window.localStorage.clear());
});

Given(
  "tôi đang ở {string}",
  async function (this: ICustomWorld, pageName: string) {
    await this.page?.goto(PageMap[pageName.toLowerCase()] ?? "/");
  }
);

When(
  "tôi mở {string} bằng đường dẫn",
  async function (this: ICustomWorld, pageName: string) {
    await this.page?.goto(PageMap[pageName.toLowerCase()]);
  }
);

Then(
  "tôi bị chuyển hướng về {string}",
  async function (this: ICustomWorld, pageName: string) {
    await this.page?.waitForURL(PageMap[pageName.toLowerCase()]);
  }
);

Then(
  "tôi thấy lỗi xuật hiện với tin nhắn {string}",
  async function (this: ICustomWorld, message: string) {
    const modalPage = new ModalPage(this.page!);
    expect(await modalPage.getMessage()).toBe(message);
  }
);
