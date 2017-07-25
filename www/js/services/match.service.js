angular.module('TeamUp').factory('matchService', matchService);

function matchService($http, Constants, $q) {

    this.getMatch = getMatch;
    this.getMatches = getMatches;

    function getMatch(id) {

    };

    function getMatches() {

        //return $http.get(Constants.MATCHES);

        // CÓDIGO TEMPORÁRIO
        const matches = [
            {
                name: 'Futsal semanal',
                date: '15/08/2017',
                description: 'Vai ser muito legal',
                id: 1
            },
            {
                name: 'Tênis',
                date: '20/08/2017',
                description: 'Vai ser muito legal',
                id: 2
            },
            {
                name: 'Vôlei',
                date: '23/08/2017',
                description: 'Vai ser muito legal',
                id: 3
            },
            {
                name: 'Natação',
                date: '23/08/2017',
                description: 'Vai ser muito legal',
                id: 4
            }
        ];

        const deferred = $q.defer();

        setTimeout(function () {
            deferred.notify('Fetching data...');
            deferred.resolve(matches);
        }, 1000);


        return deferred.promise;
    }

    return this;
}
