angular.module('TeamUp').controller('ViewProfileCtrl', ViewProfileCtrl);


function ViewProfileCtrl($scope, $window, $rootScope,
	$http, $state, $stateParams,
	$ionicModal, SessionService,
	UserService, Constants, matchService) {


	$scope._editedUser = {};
	$scope.isFavorite = false;
	$scope.isSaveChangesDisabled = false;
	$scope.isFavoriteDisabled = false;

	$scope._resetEditedUser = _resetEditedUser;
	$scope.openEditProfileView = openEditProfileView;
	$scope.closeEditProfileView = closeEditProfileView;
	$scope.saveChanges = saveChanges;
	$scope.toggleFavorite = toggleFavorite;


	function toggleFavorite() {

		if (!$scope.isFavoriteDisabled) {

			$scope.isFavoriteDisabled = true;

			if ($scope.sessionUser.id !== $scope.user.id) {

				UserService.toggleFavorite($scope.user.id).then(function (response) {
				
					console.log('response ', response);
					$scope.isFavoriteDisabled = false;
					$scope.isFavorite = !$scope.isFavorite;
				
				}, function (error) {
					
					$scope.isFavoriteDisabled = false;
					console.log('#deuRuim ', error);
				
				});
			}
		}
	}


	function saveChanges() {

		if (!$scope.isSaveChangesDisabled) {

			$scope.isSaveChangesDisabled = true;

			const changes = UserService.parseUserToJSON($scope._editedUser);
			UserService.saveChangesProfile(changes).then(function (response) {

				$scope.user = response.data;
				$scope.user.profilePhoto = 'img/profile_default.svg';
				$scope.editProfileView.hide().then(function () {
					$scope.isSaveChangesDisabled = false;
				}, function (error) {
					$scope.isSaveChangesDisabled = false;
				});

				console.log('Edições salvas ', $scope.user);
			}, function (error) {
				$scope.isSaveChangesDisabled = false;
				console.log('DIDNT WORK!!! ', error);
			});
		}




	}

	function openEditProfileView() {
		$scope.editProfileView.show();
	}

	function closeEditProfileView() {
		$scope.editProfileView.hide();
	}
	// TODO
	function _resetEditedUser() {
		$scope._editedUser = {
			name: $scope.user.name,
			email: $scope.user.email,
			address: $scope.user.address,
			password: '',
			phone: $scope.user.phone
		};
	}

	$ionicModal.fromTemplateUrl('templates/edit-profile.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.editProfileView = modal;
	});

	$scope.$on('$destroy', function () {
		$scope.editProfileView.remove();
	});

	$scope.$on('$ionicView.beforeEnter', function () {
		$scope.canEdit = false;

		// Pega usuário da sessão no back
		UserService.getOne($stateParams.id,
			// Sucesso
			function (user) {
				$scope.user = user;
				$scope.user.profilePhoto = 'img/profile_default.svg';
				console.log('user ', user);
				$scope.sessionUser = SessionService.getUser();

				if ($scope.sessionUser !== null && $scope.user.id === $scope.sessionUser.id) {
					$scope.canEdit = true;
					$scope.sessionUser = $scope.user;
				} else if ($scope.sessionUser !== null) {
					UserService.getOne($scope.sessionUser.id, function (user) {
						$scope.sessionUser = user;
						$scope.isFavorite = $scope.sessionUser.favoriteUsers.includes($scope.user.id);

						console.log('session user ', $scope.sessionUser);
					}, function (error) {
						console.log('Error ', error);
					});


				}

				$scope._resetEditedUser();
				// Se for o próprio user, atualiza na sessão

			}, function (errResponse) {
				$scope.user = SessionService.getUser();
				$rootScope.hideLoading();
			}
		);
	});
}