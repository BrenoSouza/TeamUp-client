angular.module('TeamUp').controller('SearchUserCtrl', SearchUserCtrl);

function SearchUserCtrl($scope, $state, $http, Constants) {

    $scope.searchResult = [];
    $scope.goToUser = goToUser;
    $scope.isLoading = true;

    $http.get(Constants.USER).then(function (response) {
        $scope.searchResult = response.data;
        $scope.isLoading = false;
        console.log('response ', response.data);
    }, function (error) {
        console.log('error ', error);
    });

    function goToUser(id) {
        $state.go('app.viewProfile', { id: id }, { reload: true });
    }
}