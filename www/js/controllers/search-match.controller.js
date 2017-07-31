angular.module('TeamUp').controller('SearchMatchCtrl', SearchMatchCtrl);

function SearchMatchCtrl($scope, $http) {

    $scope.searchCamp = '';
    $scope.searchResult = [];

    $scope.search = search;

    function search() {
        console.log('search');
    }
    
}