angular.module("TeamUp").controller('LoginCtrl', function ($scope, $state, autenticService, SessionService) {

	$scope.$on('$ionicView.beforeEnter', function () {
		if (!SessionService.getUser()) {
			$scope.user = {};
			console.log("sem sessao");
		} else {
			$state.go('app.perfil');
		}
	});

	$scope.login = function () {
		autenticService.login($scope.user, function (error) {
			if (error) {
				console.log("ERRO");
			} else $state.go("app.perfil", {}, { reload: true });
		});
	};

	$scope.goToSignup = function () {
		$state.go('signup');
	}

});
