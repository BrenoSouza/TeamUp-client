angular.module('TeamUp').factory('Constants', Constants);

function Constants() {
    var constants = {};

    // Heroku
    constants.DOMAIN = 'https://es-project.herokuapp.com';
    constants.LOGIN_URL = constants.DOMAIN + '/auth';
    constants.SIGNUP = constants.DOMAIN + '/register';
    constants.USER = constants.DOMAIN + '/user';
    constants.MATCHES_LIST = constants.DOMAIN + '/games';
    constants.MATCH = constants.DOMAIN + '/game';
    constants.MATCH_MEMBERS = constants.DOMAIN + '/guests';
    constants.MATCH_REQUEST = constants.DOMAIN + '/gameRequest';
    constants.ACCEPT_REQUEST = constants.DOMAIN + '/acceptRequest';
    constants.REJECT_REQUEST = constants.DOMAIN + '/rejectRequest';
    constants.LEAVE_MATCH = constants.DOMAIN + '/leaveGame';
    constants.GET_MATCH_REQUESTS = constants.DOMAIN + '/guestRequests';
    constants.MY_MATCHES = constants.DOMAIN + '/mygames';
    constants.FAVORITES = constants.DOMAIN + '/favoriteusers';
    constants.TOGGLE_FAVORITE = constants.DOMAIN + '/favorite';

    return constants;
}
