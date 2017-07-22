angular.module('TeamUp').factory('UserService', function($http, $localStorage, SessionService, Constants) {

	var User = {};

	User.getAll = function (successCb, errorCb) {
		$http.get(Constants.USER).then(function successCallback(response) {
			successCb(response.data.users);
		}, function errorCallback(errResponse) {
			errorCb(errResponse);
		});
	};

	User.getOne = function (id, successCb, errorCb) {
		$http.get(Constants.USER + '/' + id).then(function successCallback(response) {
			successCb(response.data);
		}, function errorCallback(errResponse) {
			errorCb(errResponse);
		});
	};
  	return User;

});
