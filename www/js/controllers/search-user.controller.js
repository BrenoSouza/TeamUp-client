angular.module('TeamUp').controller('SearchUserCtrl', SearchUserCtrl);

function SearchUserCtrl($scope, $state, $http, Constants) {

    $scope.searchResult = [];
    $scope.goToUser = goToUser;

    $http.get(Constants.USER).then(function (response) {
        $scope.searchResult = response.data;
        console.log('response ', response.data);
    }, function (error) {
        console.log('error ', error);
    });

    function goToUser(id) {
        console.log('user id ', id);
        $state.go('app.viewProfile', { id: id }, { reload: true });
    }
}