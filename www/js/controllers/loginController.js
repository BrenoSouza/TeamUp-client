angular.module("TeamUp").controller('LoginCtrl', function ($scope, $state, autenticService, SessionService, $document) {

	
	console.log($scope.loginForm);
	$scope.$on('$ionicView.beforeEnter', function () {
		if (!SessionService.getUser()) {
			$scope.user = {};
			console.log('sem sessao');
		} else {
			$state.go('app.matches');
		}
	});

	$scope.login = function () {
		autenticService.login($scope.user, function (error) {
			if (error) {
				console.log('ERRO');
			} else $state.go('app.matches', {}, { reload: true });
		});
	};

	$scope.goToSignup = function () {
		$state.go('signup');
	}

});
