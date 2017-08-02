angular.module('TeamUp').controller('SearchMatchCtrl', SearchMatchCtrl);

function SearchMatchCtrl($scope, $http, Constants) {

    $scope.searchCamp = '';
    $scope.searchResult = [];

    $scope.search = search;
    $scope.goToMatch = goToMatch;

    $http.get(Constants.MATCH).then(function(response) {
        $scope.searchResult = response.data;
        console.log('response ', response.data);
    }, function(error) {
        console.log('error ', error);
    });

    function search() {
        console.log('search');
    }

    function goToMatch(id) {
        console.log('goToMatch ', id);
    }
    
}