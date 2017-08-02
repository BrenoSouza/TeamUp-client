angular.module('TeamUp').controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $state, $ionicSideMenuDelegate, authService, SessionService, $window) {

	$scope.$on('unauthorizedResponseError', function (event) {
		console.log('unauthorized');
		if (event.defaultPrevented)
			return;

		event.defaultPrevented = true;
		authService.logout(true);
	});

	$scope.goToPerfil = function() {
		var userId = (SessionService.getUser()).id;
		$state.go('app.viewProfile', { id: userId }, { reload: true });
	};

	$scope.goToUsers = function() {
		$state.go('app.users', {}, { reload: true });
	};

	$scope.goToFavorites = function() {
		$state.go('app.favorites', {}, { reload: true });
	}

	$scope.goToSearchMatch = function() {
		$state.go('app.searchMatch', {}, { reload: true });
	}

	$scope.goToMatches = function() {
		$state.go('app.matches', {}, { reload: true });
		$window.location.reload();
	}

	$scope.logout = function() {
		authService.logout();
	};

	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
}
