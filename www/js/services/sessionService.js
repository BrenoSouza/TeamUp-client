angular.module('TeamUp').factory('SessionService', function($http, $localStorage) {

	var Session = {};

	Session.generateSession = function(user, token) {
		console.log(user);
			$localStorage.session = {'user': user,
								 							'token': token };

		console.log($localStorage.session);
	};

	Session.getUser = function() {
		if($localStorage.session)
			return $localStorage.session.user;

		return null;
	};

	Session.setUser = function(user) {
		$localStorage.session.user = user;
	};

	Session.getToken = function() {
		if($localStorage.session)
			return $localStorage.session.token;

		return null;
	};

	Session.removeSession = function() {
		delete $localStorage.session;
	};

  return Session;

});
