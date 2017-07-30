angular.module('TeamUp').factory('matchService', matchService);

function matchService($http, Constants, $q, SessionService) {

    this.getMatch = getMatch;
    this.getMatches = getMatches;
    this.getMyMatches = getMyMatches;
    this.addNewMatch = addNewMatch;

    console.log('session ', SessionService.getUser());

    function getMatch(id) {
        // CÓDIGO TEMPORÁRIO
        const matches = [
            {
                name: 'Futsal semanal',
                date: '15/08/2017',
                description: 'Vai ser legal',
                sport: 'futsal',
                address: 'Próximo a ufcg',
                id: 1
            },
            {
                name: 'Tênis',
                date: '20/08/2017',
                description: 'Vai ser legal',
                sport: 'futsal',
                address: 'Próximo a ufcg',
                id: 2
            },
            {
                name: 'Vôlei',
                date: '23/08/2017',
                description: 'Vai ser legal',
                sport: 'futsal',
                address: 'Próximo a ufcg',
                id: 3
            },
            {
                name: 'Natação',
                date: '23/08/2017',
                description: 'Vai ser legal',
                sport: 'futsal',
                address: 'Próximo a ufcg',
                id: 4
            }
        ];

        const deferred = $q.defer();

        setTimeout(function() {
            deferred.notify('Fetching data...');
            var match = matches[0];
            for(var i = 0; i < matches.length; i++) {
                if(matches[i].id === id) {
                    match = matches[i];
                }
            }
            deferred.resolve(match);
        }, 1000);

        return deferred.promise;
    }

    function getMatches() {
        return $http.get(Constants.MATCHES_LIST);
    }

    function getMyMatches() {
        return $http.get(Constants.MY_MATCHES);
    }

    function addNewMatch(match) {
        return $http.post(Constants.MATCH, match);
    }

    return this;
}
