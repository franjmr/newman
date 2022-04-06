# Postman Automation
Postman collection automation example using [Newman](https://www.npmjs.com/package/newman)

# Prerequisite
- [Npm](https://github.com/coreybutler/nvm-windows)
- [Node.js](https://nodejs.org/es/)

# Install 
```bash
npm install
```

# Postman Documentation
- [Getting Started](https://learning.postman.com/docs/getting-started/introduction/)
- [Test Examples](https://www.postman.com/postman/workspace/test-examples-in-postman/overview)
# Usage
Simply include the Postman collection in a directory and call it with a script. In the script property of the "package.json" file several executions have been configured as examples:
## Run collection file using cli reporter
```bash
npm run test:examples:cli
```
## Run collection file using junit reporter
```bash
npm run test:examples:junit
```
## Run ALL collections files using default reporter (cli)
```bash
npm run test:collections:all
```
## Run ALL collections files using multi reporter (cli,junit)
```bash
npm run test:collections:all:multireport
```
## Run the collections that are inside a specific directory into the parent directory of collections using cli reporter
```bash
npm run test:collections:examples:cli
```