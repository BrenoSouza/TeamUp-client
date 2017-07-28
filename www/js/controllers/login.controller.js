angular.module('TeamUp').controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $state, authService, SessionService, $document) {

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
		authService.login($scope.user, function (error) {
			if (error) {
				console.log('ERRO');
			} else $state.go('app.matches', {}, { reload: true });
		});
	};

	function goToSignup() {
		$state.go('signup');
	}

}
