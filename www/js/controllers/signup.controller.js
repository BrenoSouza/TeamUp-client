angular.module('TeamUp').controller('SignupCtrl', SignupCtrl);

function SignupCtrl($scope, $state, authService, SessionService) {

    $scope.user = {
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    };

    $scope.isSignupDisable = false;

    $scope.$on('$ionicView.beforeEnter', function () {
        if (!SessionService.getUser()) {
            // $scope.user = {};
            console.log("sem sessao");
        } else {
            $state.go('app.perfil');
        }
    });

    $scope.signup = function () {
        console.log('usr ', $scope.user);


        if (!$scope.isSignupDisable) {
            $scope.isSignupDisable = true;

            authService.signup($scope.user).then(function (response) {
                $scope.isSignupDisable = false;
                $state.go('login');
            }, function (error) {
                $scope.isSignupDisable = false;
                console.log('#deuRuim ', error);
            });
        }
    }

    $scope.goBackLogin = function () {
        $state.go('login');
    }
}
