angular.module('TeamUp').factory('matchesService', function ($http, Constants, $q) {

    this.getMatch = getMatch;
    this.getMatches = getMatches;

    function getMatch(id) {
        // CÓDIGO TEMPORÁRIO
        const matches = [
            {
                name: 'Futsal semanal',
                date: '15/08/2017',
                id: 1
            },
            {
                name: 'Tênis',
                date: '20/08/2017',
                id: 2
            },
            {
                name: 'Vôlei',
                date: '23/08/2017',
                id: 3
            },
            {
                name: 'Natação',
                date: '23/08/2017',
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
    };

    function getMatches() {

        //return $http.get(Constants.MATCHES);

        // CÓDIGO TEMPORÁRIO
        const matches = [
            {
                name: 'Futsal semanal',
                date: '15/08/2017',
                id: 1
            },
            {
                name: 'Tênis',
                date: '20/08/2017',
                id: 2
            },
            {
                name: 'Vôlei',
                date: '23/08/2017',
                id: 3
            },
            {
                name: 'Natação',
                date: '23/08/2017',
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
});