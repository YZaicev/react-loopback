const loopback = require('loopback');
const boot = require('loopback-boot');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

const config = require(`../webpack.config.js`);

const app = module.exports = loopback();
const compiler = webpack(config);
const path = require('path');

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));  
app.use(webpackHotMiddleware(compiler));

const explorer = require('loopback-component-explorer');  // Module was loopback-explorer in v. 2.0.1 and earlier

app.use('/explorer', explorer.routes(app, {}));

app.engine('html', require('ejs').renderFile);

// app.use(loopback.static(path.dirname(app.get('indexFile'))));

// app.use('*', function (req, res) {
//   res.render(__dirname + '/../client/index.html')
// });

app.start = () => {
  // start the web server
  return app.listen(() => {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
