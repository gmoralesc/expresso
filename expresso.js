import { parse } from 'url';
import { pathToRegexp } from 'path-to-regexp';

function extractQuery(qs) {
  const query = {};
  qs.split('&')
    .map((item) => item.split('='))
    .forEach((item) => {
      const [name, value] = item;
      Object.defineProperty(query, name, {
        value,
        enumerable: true,
      });
    });
  return query;
}

export default function expresso() {
  const middlewares = [];

  function send(content) {
    this.end(content);
  }

  function status(code) {
    this.statusCode = code;
    return this;
  }

  function json(content) {
    this.setHeader('Content-Type', 'application/json');
    this.end(JSON.stringify(content));
  }

  const app = function next(req, res, start = 0, err = undefined) {
    res.send = send;
    res.status = status;
    res.json = json;

    // Extract URL
    const { method, url } = req;
    const { pathname, query } = parse(url);

    // Match Route
    let index = -1;
    for (let i = start; i < middlewares.length; i += 1) {
      if (err) {
        if (middlewares[i].callback.length === 4) {
          index = i;
          break;
        }
      } else {
        if (middlewares[i].route) {
          if (middlewares[i].method === method) {
            if (middlewares[i].route === pathname) {
              req.query = extractQuery(query || '');
              index = i;
              break;
            } else {
              const keys = [];
              const regexp = pathToRegexp(middlewares[i].route, keys);
              const values = regexp.exec(pathname) || [];

              if (values.length > 0) {
                const params = {};
                keys.forEach((param, pos) => {
                  Object.defineProperty(params, param.name, {
                    value: values[pos + 1],
                    enumerable: true,
                  });
                });

                req.query = extractQuery(query || '');
                req.params = params;
                index = i;
                break;
              }
            }
          }
        } else {
          index = i;
          break;
        }
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

      try {
        middlewares[index].callback(...params, (error = undefined) => {
          next(req, res, index + 1, error);
        });
      } catch (error) {
        next(...params, index + 1, error);
      }
    }
  };

  app.get = (...args) => {
    const [route, ...callbacks] = args;
    callbacks.forEach((callback) => {
      middlewares.push({
        route,
        callback,
        method: 'GET',
      });
    });
  };

  app.post = (...args) => {
    const [route, ...callbacks] = args;
    callbacks.forEach((callback) => {
      middlewares.push({
        route,
        callback,
        method: 'POST',
      });
    });
  };

  app.use = (callback) => {
    middlewares.push({
      callback,
    });
  };

  return app;
}
