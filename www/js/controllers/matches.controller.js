angular.module('TeamUp').controller('MatchesCtrl', MatchesCtrl);


function MatchesCtrl($scope, $state, $ionicModal, matchService) {


    $scope._newMatch = {};
    $scope.goToMatch = goToMatch;

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

    matchService.getMatches().then(function (response) {
        $scope.matches = response.data;
    }, function (reason) {
        console.log('reason ', reason);
    });


    function _getMyMatches() {
        matchService.getMyMatches().then(function (response) {
            $scope.myMatches = response.data;
            console.log('response ', response.data);
        });
    }
    _getMyMatches();

    function goToMatch(id) {
        $state.go('app.match.details', { id: id }, { reload: true });
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

        matchService.addNewMatch(newMatch).then(function (response) {
            _getMyMatches();
            $scope.newMatchView.hide();
            $scope._resetNewMatch();
        }, function (error) {
            console.log('#deuRuim');
        });

    }
}