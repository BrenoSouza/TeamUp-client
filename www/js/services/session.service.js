angular.module('TeamUp').factory('SessionService', SessionService); 

function SessionService($http, $localStorage) {

	this.generateSession = generateSession;
	this.getUser = getUser;
	this.setUser = setUser;
	this.getToken = getToken;
	this.removeSession = removeSession;

	function generateSession(user, token) {
		console.log(user);
			$localStorage.session = {'user': user, 'token': token };

		console.log($localStorage.session);
	};

	function getUser() {
		if($localStorage.session)
			return $localStorage.session.user;

		return null;
	};

	function setUser(user) {
		$localStorage.session.user = user;
	};

	function getToken() {
		if($localStorage.session)
			return $localStorage.session.token;

		return null;
	};

	function removeSession() {
		delete $localStorage.session;
	};

  return this;

}
