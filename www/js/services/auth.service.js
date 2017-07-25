angular.module('TeamUp').factory('authService', authService);

function authService($http, $state, Constants, SessionService) {

	this.login = login;
	this.logout = logout;

  	function login(user, callback) {
		console.log('aqui');
		authenticate(user, callback);
	};

	function logout(unauthorizedResponseError) {
		if(unauthorizedResponseError){
			SessionService.removeSession();
			$state.go('login');
		}

		$http.post(Constants.LOGOUT).then(function (response) {
			console.log('deslogou');
			SessionService.removeSession();
			$state.go('login');
		}, function(response) {
			return;
		});
	};

	function authenticate(user, callback) {
		$http.post(Constants.LOGIN_URL, user).then(function (data) {
			SessionService.generateSession(data.data.user, data.data.token);
			$state.go('app.perfil');
			callback(false);
		}, function(response) {
			console.log(response);
			callback(true);
		});
	};

	return this;
}
