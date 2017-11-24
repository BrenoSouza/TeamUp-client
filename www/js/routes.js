angular.module('TeamUp').config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

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

        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller: 'SignupCtrl'
        })

        .state('testing', {
            url: '/testing',
            templateUrl: 'templates/testing.html',
            controller: 'TestingCtrl'
        })

        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html"
        })

        .state('app.viewProfile', {
            url: '/profile/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/view-profile.html',
                    controller: 'ViewProfileCtrl',
                    cache: false
                }
            }
        })

        .state('app.matches', {
            url: '/matches',
            views: {
                'menuContent': {
                    templateUrl: 'templates/matches.html',
                    controller: 'MatchesCtrl',
                    cache: false,
                    abstract: true
                }
            }
        })

        .state('app.matches.myMatches', {
            url: '/my-matches',
            views: {
                'my-matches': {
                    templateUrl: 'templates/my-matches.html',
                    controller: 'MatchesCtrl',
                    cache: false
                }
            }
        })

        .state('app.matches.otherMatches', {
            url: '/other-matches',
            views: {
                'other-matches': {
                    templateUrl: 'templates/other-matches.html',
                    controller: 'MatchesCtrl',
                    cache: false
                }
            }
        })

        .state('app.match', {
            url: '/match/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/match.html',
                    controller: 'MatchCtrl',
                    cache: false,
                    abstract: true
                }
            }
        })

        .state('app.match.details', {
            url: '/details',
            views: {
                'match-details': {
                    templateUrl: 'templates/match-details.html',
                    controller: 'MatchCtrl',
                    cache: false
                }
            }
        })

        .state('app.match.members', {
            url: '/members',
            views: {
                'match-members': {
                    templateUrl: 'templates/match-members.html',
                    controller: 'MatchCtrl',
                    cache: false
                }
            }
        })

        .state('app.match.pendingRequests', {
            url: '/pending-requests',
            views: {
                'match-pending-requests': {
                    templateUrl: 'templates/match-pending-requests.html',
                    controller: 'MatchCtrl',
                    cache: false
                }
            }
        })

        .state('app.searchMatch', {
            url: '/search-match',
            views: {
                'menuContent': {
                    templateUrl: 'templates/search-match.html',
                    controller: 'SearchMatchCtrl',
                    cache: false
                }
            }
        })

        .state('app.searchUser', {
            url: '/search-user',
            views: {
                'menuContent': {
                    templateUrl: 'templates/search-user.html',
                    controller: 'SearchUserCtrl',
                    cache: false
                }
            }
        })

        .state('app.favorites', {
            url: '/favorites',
            views: {
                'menuContent': {
                    templateUrl: 'templates/favorites.html',
                    controller: 'FavoritesCtrl',
                    cache: false
                }
            }
        })
    
        .state('app.perfil', {
            url: '/perfil',
            views: {
                'menuContent': {
                    templateUrl: 'templates/perfil.html',
                    controller: 'ProfileCtrl',
                    cache: false
                }
            }
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
    $ionicConfigProvider.tabs.position('bottom');
});
