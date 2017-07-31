angular.module('TeamUp').factory('UserService', UserService);

function UserService($http, $localStorage, SessionService, Constants) {

	this.getAll = getAll;
	this.getOne = getOne;
	this.toggleFavorite = toggleFavorite;

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

	function toggleFavorite(favoriteId) {
		return $http.post(Constants.TOGGLE_FAVORITE + '/' + favoriteId);
	}
	  
	return this;

}
