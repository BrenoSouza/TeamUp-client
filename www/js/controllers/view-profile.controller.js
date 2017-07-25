angular.module('TeamUp').controller('ViewProfileCtrl', ViewProfileCtrl);


function ViewProfileCtrl($scope, $window, $rootScope,
	$http, $state, $stateParams,
	$ionicModal, SessionService,
	UserService, Constants, matchService) {



	$scope._editedUser = {};

	$scope._resetEditedUser = _resetEditedUser;
	$scope.openEditProfileView = openEditProfileView;
	$scope.closeEditProfileView = closeEditProfileView;
	$scope.saveChanges = saveChanges;


	matchService.getMatches().then(function (data) {
		$scope.matches = data;
	}, function (error) {
		console.log(error);
	});

	function saveChanges() {
		$scope.user.name = $scope._editedUser.name;
		$scope.user.phone = $scope._editedUser.phone;
		console.log('fodaci');
		$scope.editProfileView.hide();
	}

	function openEditProfileView() {
		$scope.editProfileView.show();
	}

	function closeEditProfileView() {
		$scope.editProfileView.hide();
	}

	function _resetEditedUser() {
		$scope._editedUser = {
			name: $scope.user.name,
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
		// Inicia o controller com tela de carregamento
		$scope.podeEditar = false;

		// Pega usuário da sessão no back
		UserService.getOne(SessionService.getUser().id,
			// Sucesso
			function (user) {
				$scope.user = user;
				$scope.user.profilePhoto = 'img/profile_default.svg';
				$scope._resetEditedUser();
				// Se for o próprio user, atualiza na sessão

			}, function (errResponse) {
				$scope.user = SessionService.getUser();
				$rootScope.hideLoading();
			}
		);
	});
}