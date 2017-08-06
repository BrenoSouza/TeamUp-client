angular.module('TeamUp').controller('SearchMatchCtrl', SearchMatchCtrl);

function SearchMatchCtrl($scope, $http, $state, $window, Constants) {

    $scope.searchCamp = '';
    $scope.searchResult = [];
    $scope.isLoading = true;

    $scope.search = search;
    $scope.goToMatch = goToMatch;

    $http.get(Constants.MATCH).then(function(response) {
        $scope.searchResult = response.data;
        $scope.isLoading = false;
        console.log('response ', response.data);
    }, function(error) {
        console.log('error ', error);
    });

    function search() {
        console.log('search');
    }

    function goToMatch(id) {
        $state.go('app.match', {id: id}, { reload: true });
        $window.location.reload();
    }
    
}