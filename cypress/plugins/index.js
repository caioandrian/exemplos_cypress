/// <reference types="cypress" />

const cucumber = require('cypress-cucumber-preprocessor').default
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');  
const exec = require('child_process').execSync;  

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      //launchOptions.args.push("--incognito");
      launchOptions.args.push('--disable-dev-shm-usage')
    }

    if (browser.name === 'electron') {                
      //launchOptions.preferences.incognito = true               
    }
 
    return launchOptions
  })

  on('before:run', async (details) => {  
    await beforeRunHook(details);  
    await exec("node ./cypress/support/clear.js")
  });

  on('after:run', async () => {  
    await exec("node ./cypress/support/reporter.js")
    await exec("npx jrm ./cypress/reports/junitreport.xml ./cypress/reports/junit/*.xml");
    await afterRunHook();
  });
}