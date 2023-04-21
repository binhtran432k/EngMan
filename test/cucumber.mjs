const getWorldParams = () => {
  const params = {
    wikipedia_homepage: "https://www.wikipedia.org/",
  };

  return params;
};

const config = {
  requireModule: ["ts-node/register"],
  paths: ["features/**/*.feature"],
  require: ["features/**/*.ts"],
  format: [
    // 'message:e2e/reports/cucumber-report.ndjson',
    "json:reports/cucumber-report.json",
    "html:reports/report.html",
    "summary",
    "progress-bar",
  ],
  formatOptions: { snippetInterface: "async-await" },
  worldParameters: getWorldParams(),
  publishQuiet: true,
};

if (process.env.USE_ALLURE) {
  config.format.push("./features/allure-reporter.ts");
} else {
  config.format.push("@cucumber/pretty-formatter");
}
export default config;
