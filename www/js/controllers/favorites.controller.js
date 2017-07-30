angular.module('TeamUp').controller('FavoritesCtrl', FavoritesCtrl);

function FavoritesCtrl($scope) {
    $scope.favorites = [
        {
            name: 'Rafael',
            id: 1
        },
        {
            name: 'Klynger',
            id: 2
        },
        {
            name: 'Silva',
            id: 3
        },
        {
            name: 'Dantas',
            id: 4
        },
        {
            name: 'Ronaldo',
            id: 5
        },
        {
            name: 'José Souza',
            id: 6
        },
        {
            name: 'Vinicius',
            id: 7
        },
        {
            name: 'Thierry',
            id: 8
        }
        
    ];
}