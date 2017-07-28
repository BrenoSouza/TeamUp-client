angular.module('TeamUp').controller('UsersCtrl', UserCtrl);

function UserCtrl($scope, $http, $state, $ionicModal, authService, $rootScope, Constants, SessionService, UserService) {

	$scope.users = [];

	$scope.$on('$ionicView.beforeEnter', function() {
		console.log('Usuários');
		// Inicia o controller com tela de carregamento
		$rootScope.showLoading();

		$scope.users = [];

		UserService.getAll(
			// Sucesso
			function (users) {
				$scope.users = users;
				$rootScope.hideLoading();
				// Erro
			}, function (errResponse) {
				$rootScope.hideLoading();
			}
		);
	});

  	$scope.viewUser = function (user) {
	    if(SessionService.podeEditar(user)){
		    $state.go('app.editPerfil', {id: user.id}, {reload: true});
	    } else {
		    $state.go('app.viewPerfil', {id: user.id}, {reload: true});
	    }
    };


    $scope.viewAll = function() {
		$rootScope.showLoading();

        UserService.getAll(

  		// Sucesso
  		    function (users) {
  			    $scope.users = users;
				$rootScope.hideLoading();

  			// Erro
  		    }, function (errResponse) {
  	    });
    };

}
