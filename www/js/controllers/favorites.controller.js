angular.module('TeamUp').controller('FavoritesCtrl', FavoritesCtrl);

function FavoritesCtrl($scope, $http, Constants) {
    
    $http.get(Constants.FAVORITES).then(function(response) {
        $scope.favorites = response.data;
    }, function(error) {
        console.log('#deuRuim ", error');
    });
}