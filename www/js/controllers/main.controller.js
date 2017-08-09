angular.module('TeamUp').controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $state, $ionicSideMenuDelegate, authService, SessionService, UserService, $window) {



	$scope.$on('unauthorizedResponseError', function (event) {
		console.log('unauthorized');
		if (event.defaultPrevented)
			return;

		event.defaultPrevented = true;
		authService.logout(true);
	});

	$scope.$on('$ionicView.beforeEnter', function () {

		if (SessionService.getUser()) {

			UserService.getOne(SessionService.getUser().id, function (user) {
				$scope.user = user;
				$scope.user.profilePhoto = 'img/profile_default.svg';
			}, function (errorResponse) {
				console.log('error ', errorResponse);
			});
		}
	});

	$scope.goToPerfil = function () {
		var userId = (SessionService.getUser()).id;
		$state.go('app.viewProfile', { id: userId }, { reload: true });
	};

	$scope.goToUsers = function () {
		$state.go('app.users', {}, { reload: true });
	};

	$scope.goToFavorites = function () {
		$state.go('app.favorites', {}, { reload: true });
	}

	$scope.goToSearchMatch = function () {
		$state.go('app.searchMatch', {}, { reload: true });
	}

	$scope.goToSearchUser = function () {
		$state.go('app.searchUser', {}, { reload: true });
	}

	$scope.goToMatches = function () {
		$state.go('app.matches', {}, { reload: true });
		$window.location.reload();
	}

	$scope.logout = function () {
		authService.logout();
	};

	$scope.toggleLeft = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
}
