# Expresso

Mimic the minimum features from Express JS

- App constructor: `express()`
- Methods: `app.get, app.post, app.put, app.patch, app.delete`
- Helper functions: `send, json, status`
- Functions: `next()`
- Middleware: `app.use, Error middleware (must include next param 4 in total)`
- Support: [Body Parser](https://www.npmjs.com/package/body-parser) or `express.json()` to parse JSON
- Multiple middleware in the methods
- Route String: Params and Querystring

## Requirements

- Node.js >= 18.x
- npm >= 8.x

## Installation

1. `git clone https://github.com/gmoralesc/expresso`
2. `cd expresso`
3. `npm install`
4. `npm run dev`
5. Base url: `http://localhost:3000`

## Configuration

Create a enviroment variable call PORT to override the default
port value 3000

## Development

1. `git clone https://github.com/gmoralesc/expresso --branch develop`
2. `cd expresso`
3. `npm install`
4. `npm run dev`
5. Base url: `http://localhost:3000`

## Test

`npm test`

## Visual Studio Code Extensions

Go to Extensions > Show Recommended Extensions

- [Node.js Extension Pack](https://marketplace.visualstudio.com/items?itemName=waderyan.nodejs-extension-pack)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Workspace configuration](https://gist.github.com/gmoralesc/a6e107370f04ee8cf7ff05a7f842198d)

## Documentation

- [Node.js](https://nodejs.org/en/)
- [Express JS](https://expressjs.com/)
- [Node.js Books](http://gmoralesc.me/books)
