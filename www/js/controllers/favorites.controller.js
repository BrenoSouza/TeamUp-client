angular.module('TeamUp').controller('FavoritesCtrl', FavoritesCtrl);

function FavoritesCtrl($scope, $http, $state, Constants) {

    $scope.goToUser = goToUser;

    $http.get(Constants.FAVORITES).then(function (response) {
        $scope.favorites = response.data;
        // $scope.favorites = undefined;
    }, function (error) {
        console.log('#deuRuim ", error');
    });

    function goToUser(id) {
        $state.go('app.viewProfile', { id: id }, { reload: true });
    }
}