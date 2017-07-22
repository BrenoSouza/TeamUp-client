angular.module("TeamUp").controller('MatchesCtrl', function($scope) {
    $scope.matches = [
        {
            name: 'Futsal semanal',
            date: '15/08/2017'
        },
        {
            name: 'Tênis',
            date: '20/08/2017'
        },
        {
            name: 'Vôlei',
            date: '23/08/2017'
        },
        {
            name: 'Natação',
            date: '23/08/2017'
        }
    ];
});