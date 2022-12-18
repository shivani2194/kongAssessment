const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    baseUrl: 'https://cloud.konghq.com/',
    
      "reporter": "mocha-junit-reporter",
      "reporterOptions": {
        "mochaFile": "./tests/e2e/reports/e2e-results-[hash].xml",
        "rootSuiteTitle": false,
        "testsuitesTitle": "End To End Test"
      },
      "defaultCommandTimeout": 30000,
      "taskTimeout": 300000,
      "pageLoadTimeout": 70000,
      "requestTimeout": 10000,
      "chromeWebSecurity": false,
      "viewportWidth": 1280,
      "viewportHeight": 800,
      "video": false,
      "numTestsKeptInMemory": 3,
      "retries": {
        "runMode": 1,
        "openMode": 0
      },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
