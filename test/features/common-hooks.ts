import {
  After,
  AfterAll,
  AfterStep,
  Before,
  BeforeAll,
  Status,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { ITestCaseHookParameter } from "@cucumber/cucumber/lib/support_code_library_builder/types";
import {
  ChromiumBrowser,
  ConsoleMessage,
  FirefoxBrowser,
  WebKitBrowser,
  chromium,
  firefox,
  request,
  webkit,
} from "@playwright/test";
import { ensureDir, readFile } from "fs-extra";
import config from "./config";
import { ICustomWorld } from "./custom-world";

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
const tracesDir = "traces";

declare global {
  // eslint-disable-next-line no-var
  var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}

setDefaultTimeout(config.debugMode ? -1 : config.navigationTimeout);

BeforeAll(async function () {
  switch (config.browser) {
    case "firefox":
      browser = await firefox.launch(config.browserOptions);
      break;
    case "webkit":
      browser = await webkit.launch(config.browserOptions);
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }
  await ensureDir(tracesDir);
});

Before({ tags: "@ignore" }, async function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return "skipped" as any;
});

Before({ tags: "@debug" }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, "-");
  // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
  this.context = await browser.newContext({
    baseURL: config.baseUrl,
    acceptDownloads: true,
    recordVideo: config.videoMode ? { dir: "reports/videos" } : undefined,
    viewport: { width: 1200, height: 800 },
  });
  this.server = await request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: config.baseApiUrl,
  });

  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = await this.context.newPage();
  this.page.on("console", async (msg: ConsoleMessage) => {
    if (msg.type() === "log") {
      this.attach(msg.text());
    }
  });
  this.feature = pickle;
});

AfterStep(async function (this: ICustomWorld) {
  const image = await this.page?.screenshot();
  image && this.attach(image, "image/png");
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    this.attach(
      `Status: ${result?.status}. Duration:${result.duration?.seconds}s`
    );

    if (result.status !== Status.PASSED) {
      // Replace : with _ because colons aren't allowed in Windows paths
      const timePart = this.startTime
        ?.toISOString()
        .split(".")[0]
        .replaceAll(":", "_");

      this.context?.tracing.stopChunk;
      await this.context?.tracing.stop({
        path: `${tracesDir}/${this.testName}-${timePart}trace.zip`,
      });
    }
  }
  const video = this.page?.video();

  await this.page?.close();
  await this.context?.close();

  if (video) {
    const videoPath = await video.path();
    this.attach(await readFile(videoPath), "video/webm");
    video.delete();
  }
});

AfterAll(async function () {
  await browser.close();
});
