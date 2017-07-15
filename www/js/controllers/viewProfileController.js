angular.module("TeamUp").controller('ViewPerfilCtrl', function($scope, $window, $rootScope, $http, $state, $stateParams, SessionService, UserService,  Constants) {
	$scope.$on('$ionicView.beforeEnter', function(){
		// Inicia o controller com tela de carregamento
		$scope.podeEditar = false;

		// Pega usuário da sessão no back
		UserService.getOne(SessionService.getUser().id,
			// Sucesso
			function (user) {
				$scope.user = user;
				// Se for o próprio user, atualiza na sessão

			}, function (errResponse) {
				$scope.user = SessionService.getUser();
				$rootScope.hideLoading();
			}
		);
	});

});
