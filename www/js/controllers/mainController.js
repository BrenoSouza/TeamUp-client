angular.module("TeamUp").controller('MainCtrl', function ($scope, $state, $ionicSideMenuDelegate, autenticService, SessionService) {

	console.log("Ok")
	$scope.$on('unauthorizedResponseError', function (event) {
		console.log("unauthorized");
		if (event.defaultPrevented)
			return;

		event.defaultPrevented = true;
		autenticService.logout(true);
	});

	$scope.goToPerfil = function () {
		var userId = (SessionService.getUser()).id;
		$state.go('app.viewPerfil', { id: userId }, { reload: true });
	};

	$scope.goToUsers = function () {
		$state.go('app.users', {}, { reload: true });
	};

	$scope.goToMatches = function() {
		$state.go('app.matches', {}, { reload: true });
	}

	$scope.logout = function () {
		autenticService.logout();
	};


	$scope.toggleLeft = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
});
