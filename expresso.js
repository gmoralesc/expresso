const { parse } = require('url');

module.exports = function expresso() {
  const middlewares = [];

  function send(content) {
    this.end(content);
  }

  function json(content) {
    this.setHeader('Content-Type', 'application/json');
    this.end(JSON.stringify(content));
  }

  function status(code) {
    this.statusCode = code;
    return this;
  }

  const app = function next(req, res, start = 0, err = undefined) {
    res.send = send;
    res.json = json;
    res.status = status;
    // Extract URL
    const { method, url } = req;
    const { pathname } = parse(url);

    // Match Route
    let index = -1;
    for (let i = start; i < middlewares.length; i += 1) {
      if (err) {
        if (middlewares[i].callback.length === 4) {
          index = i;
          break;
        }
      } else if (middlewares[i].route) {
        if (middlewares[i].route === pathname && middlewares[i].method === method) {
          index = i;
          break;
        }
      } else {
        index = i;
        break;
      }
    }
    // Execute Callback
    if (index === -1) {
      res.statusCode = 404;
      res.end('Not middleware Found');
    } else {
      const params = [req, res];
      if (err) {
        params.unshift(err);
      }
      middlewares[index].callback(...params, (error = undefined) => {
        next(req, res, index + 1, error);
      });
    }
  };

  app.get = (route, callback) => {
    middlewares.push({
      route,
      callback,
      method: 'GET',
    });
  };

  app.use = (callback) => {
    middlewares.push({
      callback,
    });
  };

  return app;
};
