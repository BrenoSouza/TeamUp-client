angular.module('TeamUp').controller('MatchesCtrl', MatchesCtrl);


function MatchesCtrl($scope, $state, $ionicModal, matchService) {


    $scope._newMatch = {};

    $scope._resetNewMatch = function () {
        $scope._newMatch = {
            name: '',
            date: new Date(),
            description: '',
            sport: '',
            address: ''
        };
    }

    $scope._resetNewMatch();

    $scope.goToMatch = goToMatch;

    matchService.getMatches().then(function (matches) {
        $scope.matches = matches.data;
        console.log('matches ', matches);
    }, function (reason) {
        console.log('reason ', reason);
    });

    matchService.getMyMatches().then(function(response) {
        $scope.myMatches = response.data;
        console.log('response.data ', response.data);
    });

    function goToMatch(id) {
        $state.go('app.match', { id: id }, { reload: true });
    }

    $ionicModal.fromTemplateUrl('templates/new-match.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.newMatchView = modal;
    });

    $scope.openNewMatchView = function () {
        $scope.newMatchView.show();
    }

    $scope.closeNewMatchView = function () {
        $scope.newMatchView.hide();
    }

    $scope.$on('$destroy', function () {
        $scope.newMatchView.remove();
    });

    // $scope.$on('newMatchView.hidden', function() {

    // });

    // $scope.$on('newMatchView.removed', function() {

    // });

    $scope.createMatch = function () {

        var newMatch = {
            name: $scope._newMatch.name,
            date: $scope._newMatch.date,
            description: $scope._newMatch.description,
            sport: $scope._newMatch.sport,
            local: $scope._newMatch.address,
        };
        console.log('nova partida ', newMatch);
        matchService.addNewMatch(newMatch).then(function (response) {
            $scope.matches.push(newMatch);
            $scope.newMatchView.hide();
            $scope._resetNewMatch();
        }, function(error) {
            console.log('#deuRuim');
        });

    }
}