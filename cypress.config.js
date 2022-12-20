const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    baseUrl: 'https://cloud.konghq.com/',
    
      "reporter": "mochawesome",
      "reporterOptions": {
        "overwrite": true,
        "html": true,
        "json": true,
        "timestamp": "mmddyyyy_HHMMss"
      },
      "screenshotsFolder": "mochawesome-report/assets",
      "defaultCommandTimeout": 10000,
      "taskTimeout": 100000,
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
