angular.module("TeamUp").controller('MatchCtrl', MatchCtrl);


function MatchCtrl($scope, $state, matchService) {

    $scope.match = {};

    matchService.getMatch($state.params.id).then(function(match) {
        $scope.match = match;
    }, function(error) {
        console.log('error ', error);
    });

}