angular.module("TeamUp").controller('LoginCtrl', function ($scope, $state, autenticService, SessionService, $document) {

	$scope.login = login;
	$scope.goToSignup = goToSignup;
	
	console.log($scope.loginForm);
	$scope.$on('$ionicView.beforeEnter', function () {
		if (!SessionService.getUser()) {
			$scope.user = {};
			console.log('sem sessao');
		} else {
			$state.go('app.matches');
		}
	});

	function login() {
		autenticService.login($scope.user, function (error) {
			if (error) {
				console.log('ERRO');
			} else $state.go('app.matches', {}, { reload: true });
		});
	};

	function goToSignup() {
		$state.go('signup');
	}

});
