angular.module('TeamUp').controller('SignupCtrl', SignupCtrl);

function SignupCtrl($scope, $state, authService, SessionService) {
    
    $scope.user = {
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    };

    $scope.$on('$ionicView.beforeEnter', function () {
        if (SessionService.getUser()) {
            $state.go('app.perfil');
        }
    });

    $scope.signup = function () {
        console.log('usr ', $scope.user);
        authService.signup($scope.user).then(function (response) {
            $state.go('login');
            console.log('response ', response);
        }, function(error) {
            console.log('#deuRuim ', error);
        });
    }

    $scope.goBackLogin = function () {
        $state.go('login');
    }
}
