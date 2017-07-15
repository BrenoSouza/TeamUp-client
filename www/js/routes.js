angular.module("TeamUp").config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html"
  })

  .state('app.viewPerfil', {
    url: "/perfil/:id",
    views: {
        'menuContent' :{
            templateUrl: "templates/viewPerfil.html",
      controller: 'ViewPerfilCtrl',
      cache: false
        }
    }
})

  .state('app.perfil', {
    url: "/perfil",
    views: {
        'menuContent' :{
            templateUrl: "templates/perfil.html",
      controller: '',
      cache: false
        }
    }
})

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  $ionicConfigProvider.tabs.position('bottom');
});
