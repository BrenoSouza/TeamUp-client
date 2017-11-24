angular.module('TeamUp').factory('matchService', matchService);

function matchService($http, Constants, $q, SessionService) {

    this.getMatch = getMatch;
    this.editMyMatch = editMyMatch;
    this.getMatches = getMatches;
    this.getMyMatches = getMyMatches;
    this.addNewMatch = addNewMatch;
    this.matchParser = matchParser;
    this.matchParseToJSON = matchParseToJSON;
    this.deleteMatch = deleteMatch;
    this.leaveMatch = leaveMatch;
    this.requestJoinMatch = requestJoinMatch;
    this.acceptMatchRequest = acceptMatchRequest;
    this.rejectMatchRequest = rejectMatchRequest;
    this.getMatchRequests = getMatchRequests;
    


    function getMatch(id) {
        return $http.get(Constants.MATCH + '/' + id.toString());
    }

    function matchParser(response) {
        const match = {
            date: new Date(response.date),
            description: response.description,
            guests: response.guests,
            guestsRequests: response.guestsRequests,
            sport: response.sport,
            idOwner: response.idOwner,
            id: response.id,
            address: response.local,
            name: response.name
        };

        if (response.guests == null) {
            match.guests = [];
        }

        if (response.guestsRequests == null) {
            match.guestsRequests = [];
        }

        return match;
    }

    function matchParseToJSON(match) {
        const matchJSON = {
            date: match.date,
            description: match.description,
            local: match.address,
            name: match.name,
            sport: match.sport
        };

        return matchJSON;
    }

    function getMatches() {
        return $http.get(Constants.MATCHES_LIST);
    }

    function deleteMatch(id) {

        return $http({
            method: "DELETE",
            data: {},
            url: Constants.MATCH + '/' + id.toString(),
            headers: { 'Content-Type': 'application/json' }
        });

    }

    function editMyMatch(matchId, newMatchData) {
        return $http({
            method: 'PUT',
            data: newMatchData,
            url: Constants.MATCH + '/' + matchId.toString(),
            headers: { 'Content-Type': 'application/json' }
        });
        // return $http.put(Constants.MATCH + '/' + matchId.toString(), newMatchData);
    }

    function leaveMatch(matchId) {
        return $http({
            method: 'PUT',
            data: {},
            url: Constants.LEAVE_MATCH + '/' + matchId.toString(),
            headers: { 'Accept': 'application/json' }
        });
    }

    function getMyMatches() {

        return $http.get(Constants.MY_MATCHES);
    }

    function getMatchRequests(matchId) {
        return $http({
            method: 'get',
            data: {},
            url: Constants.GET_MATCH_REQUESTS + '/' + matchId.toString(),
            headers: { 'Accept': 'application/json' }
        });
    }

    function requestJoinMatch(matchId) {
        return $http({
            method: 'post',
            data: {},
            url: Constants.MATCH_REQUEST + '/' + matchId.toString(),
            headers: { 'Content-type': 'application/json' }
        });
    }

    function acceptMatchRequest(matchId, userId) {
        return $http({
            method: 'post',
            data: {},
            url: Constants.ACCEPT_REQUEST + '/' + matchId.toString() + '/' + userId.toString(),
            headers: { 'Content-type': 'application/json' }
        });
    }

    function rejectMatchRequest(matchId, userId) {
        return $http({
            method: 'post',
            data: {},
            url: Constants.REJECT_REQUEST + '/' + matchId.toString() + '/' + userId.toString(),
            headers: { 'Content-type': 'application/json'}
        });
    }

    function addNewMatch(match) {
        return $http.post(Constants.MATCH, match);
    }

    return this;
}
