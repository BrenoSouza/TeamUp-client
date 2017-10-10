angular.module('TeamUp').factory('UserService', UserService);

function UserService($http, $localStorage, SessionService, Constants) {

	this.getAll = getAll;
	this.getOne = getOne;
	this.toggleFavorite = toggleFavorite;
	this.parseUserToJSON = parseUserToJSON;
	this.saveChangesProfile = saveChangesProfile;

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
		return $http({
			method: 'post',
			data: {},
			url: Constants.TOGGLE_FAVORITE + '/' + favoriteId.toString(),
			headers: { 'Accept': 'application/json' }
		});
	}

	function parseUserToJSON(user) {
		var userJSON = {
			name: user.name,
			email: user.email,
			address: user.address,
			phone: user.phone
		};

		if(user.password && user.password.length >= 8) {
			userJSON.password = user.password;
		}

		return userJSON;
	}

	function saveChangesProfile(editedUser) {
		return $http({
			method: 'PUT',
			data: editedUser,
			url: Constants.USER,
			headers: { 'Accept': 'application/json' }
		});
	}

	return this;

}
