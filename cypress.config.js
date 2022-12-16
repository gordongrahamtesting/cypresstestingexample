const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://fe-automation-tool.s3.eu-west-1.amazonaws.com/'
  },
});
