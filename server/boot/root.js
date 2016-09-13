module.exports = function(server) {
  var router = server.loopback.Router();
  
  var routes = require('../../client/config/config').routes;

	Object
		.keys(routes)
		.forEach(function(route) {
			router.get(route, function(req, res) {
	    		res.render(__dirname + '/../../client/index.html');
	  		});
		});
  
  // var restApiRoot = server.get('restApiRoot');
  // server.use(restApiRoot, server.loopback.rest());

  server.use(router);
};
