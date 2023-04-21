import { LaunchOptions } from "@playwright/test";

const browserOptions: LaunchOptions = {
  headless: process.env.PWHEADLESS_MODE
    ? process.env.PWHEADLESS_MODE.toLowerCase() == "true"
    : false,
  slowMo: parseInt(process.env.PWSLOW_TIME || "0") || 0,
  args: [
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
  ],
  firefoxUserPrefs: {
    "media.navigator.streams.fake": true,
    "media.navigator.permission.disabled": true,
  },
};

const config = {
  browser: process.env.PWBROWSER || "chromium",
  browserOptions,
  baseUrl: process.env.PWBASE_URL,
  imgThreshold: { threshold: 0.4 },
  baseApiUrl: process.env.PWBASE_API_URL,
  debugMode: process.env.PWDEBUG,
  videoMode: process.env.PWVIDEO,
  navigationTimeout: 3 * 1000,
} as const;

export default config;
