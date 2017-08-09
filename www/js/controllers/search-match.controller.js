angular.module('TeamUp').controller('SearchMatchCtrl', SearchMatchCtrl);

function SearchMatchCtrl($scope, $http, $state, $window, Constants) {

    $scope.search = {
        searchCamp: ''
    };
    $scope.searchResult = [];
    $scope.allMatches = [];
    $scope.isLoading = true;

    $scope.filterMatches = filterMatches;
    $scope.goToMatch = goToMatch;

    $http.get(Constants.MATCH).then(function (response) {
        $scope.allMatches = response.data;
        $scope.searchResult = response.data;
        $scope.isLoading = false;
        console.log('response ', response.data);
    }, function (error) {
        console.log('error ', error);
    });

    function goToMatch(id) {
        $state.go('app.match', { id: id }, { reload: true });
        $window.location.reload();
    }

    function filterMatches() {
        const searchStr = $scope.search.searchCamp.toLowerCase();

        $scope.searchResult = $scope.allMatches.filter(function (match) {
            return match.name.toLowerCase().includes(searchStr)
                || match.sport.toLowerCase().includes(searchStr);
        });
    }

}