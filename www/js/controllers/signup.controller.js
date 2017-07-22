angular.module("TeamUp").controller('SignupCtrl', function ($scope, $state, autenticService, SessionService) {
    
    $scope.$on('$ionicView.beforeEnter', function () {
        if (!SessionService.getUser()) {
            $scope.user = {};
            console.log("sem sessao");
        } else {
            $state.go('app.perfil');
        }
    });

    $scope.signup = function () {
        console.log('it works!!!');
    }
});