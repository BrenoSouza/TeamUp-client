angular.module('TeamUp').factory('Constants', function() {
    var constants = {};

    // Heroku
   constants.LOGIN_URL = 'https://es-project.herokuapp.com/auth';
   constants.USER = 'https://es-project.herokuapp.com/user';
   constants.MATCH = 'https://es-project.herokuapp.com/game'

    return constants;
});
