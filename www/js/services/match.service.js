angular.module('TeamUp').factory('matchService', matchService);

function matchService($http, Constants, $q) {

    this.getMatch = getMatch;
    this.getMatches = getMatches;
    this.getMyMatches = getMyMatches;
    this.addNewMatch = addNewMatch;
    this.matchParser = matchParser;
    this.deleteMatch = deleteMatch;


    function getMatch(id) {
        return $http.get(Constants.MATCH + '/' + id.toString()); ;
    }

    function matchParser(response) {
        const match = {
            date: response.date,
            description: response.description,
            guests: response.guests,
            guestsRequests: response.guestsRequests,
            sport: response.sport,
            idOwner: response.idOwner,
            id: response.id,
            address: response.local,
            name: response.name
        };

        if(response.guests == null) {
            match.guests = [];
        }

        if(response.guestsRequests == null) {
            match.guestsRequests = [];
        }

        return match;
    }

    function getMatches() {
        return $http.get(Constants.MATCHES_LIST);
    }

    function deleteMatch(id) {
        
        return $http({  
        method: "DELETE",  
        data: {},
        url: Constants.MATCH + '/' + id.toString(),  
        headers: {'Content-Type': 'application/json' }  
    });
        
    }

    function getMyMatches() {
        return $http.get(Constants.MY_MATCHES);
    }

    function addNewMatch(match) {
        return $http.post(Constants.MATCH, match);
    }

    return this;
}
