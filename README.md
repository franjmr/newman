# Introduction 
Running Postman collections on the command line with [Newman](https://www.npmjs.com/package/newman)

# Getting Started

## Install
```bash
# Install dependencies
npm install
```
## Reporters
- Terminal console: Default
- [newman-reporter-junitfull](https://www.npmjs.com/package/newman-reporter-junitfull):JUnit reporter for Newman that provides the information about the collection run in JUnit format. 
## Execute Postman collection

```bash
# Console reporter
npm run tests:postman
```

```bash
# JUnit reporter
npm run tests:postman:junit
```