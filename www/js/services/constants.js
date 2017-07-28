angular.module('TeamUp').factory('Constants', Constants);

function Constants() {
    var constants = {};

    // Heroku
    constants.DOMAIN = 'https://es-project.herokuapp.com';
    constants.LOGIN_URL = constants.DOMAIN + '/auth';
    constants.USER = constants.DOMAIN + '/user';

    return constants;
}
