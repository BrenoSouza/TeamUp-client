angular.module('TeamUp').controller('SignupCtrl', SignupCtrl);

function SignupCtrl($scope, $state, authService, SessionService) {
    
    $scope.user = {
        name: 'Rafael Klynger',
        email: 'rafael@hotmail.com.br',
        password: '123456789',
        phone: '123456789',
        address: 'Rua teste endereco teste'
    };

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
        authService.signup($scope.user).then(function (response) {
            console.log('PEGOOOU!! ', response);
        }, function(error) {
            console.log('#deuRuim ', error);
        });
    }

    $scope.goBackLogin = function () {
        $state.go('login');
    }
}
