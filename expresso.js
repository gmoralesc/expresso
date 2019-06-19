const {
  parse,
} = require('url');

module.exports = function expresso() {
  const middlewares = [];

  const app = function app(req, res) {
    // Extract URL
    const {
      method,
      url,
    } = req;
    const {
      pathname,
    } = parse(url);

    // Match Route
    let index = -1;
    for (let i = 0; i < middlewares.length; i += 1) {
      if (middlewares[i].route === pathname && middlewares[i].method === method) {
        index = i;
        break;
      }
    }
    // Execute Callback
    if (index === -1) {
      res.statusCode = 404;
      res.end('Not middleware Found');
    } else {
      middlewares[index].callback(req, res);
    }
  };

  app.get = (route, callback) => {
    middlewares.push({
      route,
      callback,
      method: 'GET',
    });
  };

  return app;
};
