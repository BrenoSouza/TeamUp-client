angular.module('TeamUp').config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('tokenInterceptor');
}]);
