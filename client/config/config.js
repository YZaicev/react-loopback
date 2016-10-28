module.exports.routes = {
	"/": {
		"name": "app",
		"handler": "App"
	},
	"/users": {
		"name": "users",
		"handler": "Users"
	},
	"/users/*": {
		"name": "user",
		"handler": "User"
	},
	"/login": {
		"name": "login",
		"handler": "Login"
	}
};
