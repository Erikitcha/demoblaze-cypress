const { defineConfig } = require("cypress");

module.exports = defineConfig({
  apiUrl: 'https://api.demoblaze.com/',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
