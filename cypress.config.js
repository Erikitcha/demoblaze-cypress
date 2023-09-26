const { defineConfig } = require("cypress");
const { rm } = require("node:fs");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoblaze.com/#",

    setupNodeEvents(on, config) {
      on("after:screenshot", () => {
        rm(config.screenshotsFolder, {
          recursive: true,
        }, () => {});
      });
    },
  },

  video: false,
  apiUrl: "https://api.demoblaze.com/",
});
