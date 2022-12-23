const { defineConfig } = require('cypress')

module.exports = defineConfig({
    projectId: 'ahe74p',
    e2e: {
        baseUrl: 'https://cloud.konghq.com/',
        reporter: 'cypress-mochawesome-reporter',
        reporterOptions: {
          charts: true,
          reportPageTitle: 'custom-title',
          embeddedScreenshots: true,
          inlineAssets: true,
          saveAllAttempts: false,
          timestamp: 'mmddyyyy_HHMMss',
          overwrite: true,
          html: true,
          json: true,
        
        },
        screenshotsFolder: 'mochawesome-report/assets',
        defaultCommandTimeout: 10000,
        pageLoadTimeout: 70000,
        taskTimeout: 10000,
        requestTimeout: 10000,
        chromeWebSecurity: false,
        videoUploadOnPasses: false,
        videoCompression: 15,
        numTestsKeptInMemory: 3,
        retries: {
            runMode: 2,
            openMode: 0,
        },
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
          },
    },
});