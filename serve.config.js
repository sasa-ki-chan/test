const serve = require('webpack-serve');
const config = require('./webpack.config.js');

// serve({}, { config });

const path = require("path");
const chokidar = require("chokidar");

const add = (app, middleware, options) => {
  middleware.webpack().then(result => {
    const server = result.hotClient.server;
    const watchPath = path.resolve(__dirname, "htdocs", "*");
    const options = { ignoreInitial: true };
    watcher = chokidar.watch(watchPath, options);
    watcher.on("change", () => {
      server.broadcast('{ "type": "window-reload", "data": {} }');
    });
  });
};

const argv = {};
const options = {
  config,
  add,
  content: "htdocs/",
  open: true,
  host: "0.0.0.0",
  port: 8080,
  staticPaths: ["htdocs/"],
};

serve(argv, options);