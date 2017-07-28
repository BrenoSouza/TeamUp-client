angular.module('TeamUp').factory('UserService', UserService);

function UserService($http, $localStorage, SessionService, Constants) {

	this.getAll = getAll;
	this.getOne = getOne;

	function getAll(successCb, errorCb) {
		$http.get(Constants.USER).then(function successCallback(response) {
			successCb(response.data.users);
		}, function errorCallback(errResponse) {
			errorCb(errResponse);
		});
	};

	function getOne(id, successCb, errorCb) {
		$http.get(Constants.USER + '/' + id).then(function successCallback(response) {
			successCb(response.data);
		}, function errorCallback(errResponse) {
			errorCb(errResponse);
		});
	};
	  
	return this;

}
