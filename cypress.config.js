const { defineConfig } = require('cypress')

module.exports = defineConfig({
  animationDistanceThreshold: 5,
  arch: 'x64',
  chromeWebSecurity: false,
  execTimeout: 60000,
  fixturesFolder: 'cypress/fixtures',
  isInteractive: true,
  keystrokeDelay: 0,
  redirectionLimit: 20,
  retries: 0,
  viewportWidth: 1366,
  viewportHeight: 768,
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 40000,
  global_timeout: 40000,
  requestTimeout: 10000,
  responseTimeout: 30000,
  numTestsKeptInMemory: 500,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  screenshotsFolder: 'cypress/reports/screenshots',
  'cucumberautocomplete.strictGherkinCompletion': true,
  video: true,
  modifyObstructiveCode: false,
  experimentalSourceRewriting: true,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    overwrite: false,
    html: false,
    video: false,
    json: true,
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    cypressMochawesomeReporterReporterOptions: {
      reporterDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'My tests',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/test-results-[hash].xml',
      toConsole: true,
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    excludeSpecPattern: '*.js',
    specPattern: '**/*.{feature,features}',
    supportFile: 'cypress/support/e2e.js',
    experimentalSessionAndOrigin: true
  }
})
