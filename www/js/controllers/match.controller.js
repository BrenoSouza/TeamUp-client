angular.module("TeamUp").controller('MatchCtrl', MatchCtrl, matchesService);


function MatchCtrl($scope, $state) {
    // matchesService.getMatch($state)
    console.log('State ', $state);
}