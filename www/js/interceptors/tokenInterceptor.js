angular.module('TeamUp').factory('tokenInterceptor',['$injector', '$q', '$rootScope', '$localStorage', function($injector, $q, $rootScope, $localStorage) {

	return {
		'request': function(config) {
			if ($localStorage.session != undefined) {
				config.headers.Authorization =  $localStorage.session.token;
			}

			return config;
		},

		'responseError': function(rejection) {
			console.log('Erro: ' + rejection.data.err);
			// Mostra mensagem de erro

			return $q.reject(rejection);
		}
	}

}]);
