angular.module('TeamUp').factory('authService', authService);

function authService($http, $state, Constants, SessionService) {

	this.login = login;
	this.logout = logout;
	this.signup = signup;

	function login(user, callback) {
		console.log('aqui');
		authenticate(user, callback);
	};

	function logout() {
		SessionService.removeSession();
		$state.go('login');
		// if (unauthorizedResponseError) {
		// 	SessionService.removeSession();
		// 	$state.go('login');
		// }

		// $http.post(Constants.LOGOUT).then(function (response) {
		// 	console.log('deslogou');
		// 	SessionService.removeSession();
		// 	$state.go('login');
		// }, function(response) {
		// 	console.log('error logout ', response);
		// });
	};

	function signup(user) {
		return $http.post(Constants.SIGNUP, user);
	}

	function authenticate(user, callback) {
		$http.post(Constants.LOGIN_URL, user).then(function (data) {
			SessionService.generateSession(data.data.user, data.data.token);
			$state.go('app.perfil');
			callback(false);
		}, function (response) {
			console.log(response);
			callback(true);
		});
	};

	return this;
}
