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
    constants.MATCH_REQUEST = constants.DOMAIN + '/gamerequest';
    constants.MY_MATCHES = constants.DOMAIN + '/mygames';
    constants.FAVORITES = constants.DOMAIN + '/favoriteusers';
    constants.TOGGLE_FAVORITE = constants.DOMAIN + '/favorite';

    return constants;
}
