# Kong - Take Home Assignment
## _This repo aims to automate test cases around "Service Hub" section of Konnect._



[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

# **Tools and Tech**
1) **IDE** - VS Code: Smart IDE with built in intelliSense and offers integrations to versioning and formatting tools. 
2) **Package Manager** - NPM: The most comprehensive online repository for the Node.js JavaScript runtime environment. 
3) **Automation tool**- Cypress: A versatile and always evolving automation tool which detects flakiness, describes errors precicely and can be easily integrated to expand test horizon.
4) **Programming language**-Java script: An extremely powerful yet light weight coding language. 
5) **Reporting tool**- Mocha awesome: A very simple, clean and reliable reporting tool.
6) **CI tool**- GitHub Actions: While using github as a versioning tool, its best to use github actions for CI to have it all at one place. Smooth integration with cy dashboard.
7) **ReadMe Generator**- Dillinger.io: A very handy read me formatting tool to generate clean and consice read me file.



## Some Insights on the automation tool - **Cypress**

- **Flake Detection**: Discover and diagnose unreliable tests with Cypress Cloud's Flaky test management.
- **Smart Orchestration**: Once you're set up to record to Cypress Cloud, easily parallelize your test suite, rerun failed specs first with Spec Prioritization, and cancel test runs on failures with Auto Cancellation for tight feedback loops.
- **Cross browser Testing**: Run tests within Firefox and Chrome-family browsers (including Edge and Electron) locally and optimally in a Continuous Integration pipeline.
- **Automatic Waiting**: Never add waits or sleeps to your tests. Cypress automatically waits for commands and assertions before moving on. No more async hell.
- **Time Travel**: Cypress takes snapshots as your tests run. Hover over commands in the Command Log to see exactly what happened at each step.
- **Test Isolation**- No need to clear cookies and cache, cypress automatically takes care of it after execution of each test block in its latest release version 12.0.0 which we will be using in the repository. 

# Project Structure - POM

**Page objects have two main benefits:**

- They keep all page element selectors in one place
- They standardize how tests interact with the page

**Implemention**:

- All the spec files import helper methods from respective helper file from the 'Page' folder.
- Files under the 'Page' folder are divided based on the functionality of the feature under test
- -All the helper files have a selector class which stores the selector value of the CSS elements which are further used in an object which groups up methods returning the "get" value of those CSS elements
- Spec files performs actions on the returned elements to mimic the workflow that a real user might follow for the app under test
- Every spec file will have have atleast one or more than one helper file in the page folder 
Clone repo, change directory and install packages:

```sh
gh repo clone shivani2194/kongKonnectAssesment
cd kongKonnectAssesment
npm install
```

Open Cypress


```sh
npm run cy:open
```

Open Cypress headless mode


```sh
npm run cy:run
```


## CI Configuration

Github actions/CI is configured such that test will be triggered everytime that any thing is pushed to the repository.To trigger the job manually, visit a recent job and select re-run jobs. 
 Upon each test run, Mocha-awesome report would be uploaded to the Pages section. Go to:
 
**Setting -> Pages on the left tab ( Please refer to the attcahed screenshot)**
 ![mochaReport](https://user-images.githubusercontent.com/19922261/209314754-420770ab-b332-445d-b80f-314e834db178.JPG)

