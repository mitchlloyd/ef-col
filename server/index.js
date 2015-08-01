// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

module.exports = function(app) {
  var globSync    = require('glob').sync;
  var mocks       = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies     = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);
  var vidStreamer = require('vid-streamer');

  // Log proxy requests
  var morgan  = require('morgan');
  app.use(morgan('dev'));

  // Parse json PUTs and POSTs
  var bodyParser  = require('body-parser');
  app.use(bodyParser.json());

  app.use(require('cookies').express());

  app.use('/api/videos', vidStreamer.settings({
    rootPath: '',
    rootFolder: 'public/movie-files/'
  }));

  mocks.forEach(function(route) { route(app); });
  proxies.forEach(function(route) { route(app); });

};
