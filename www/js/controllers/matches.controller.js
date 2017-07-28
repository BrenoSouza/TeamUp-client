angular.module("TeamUp").controller('MatchesCtrl', function ($scope, $state, $ionicModal, matchesService) {


    $scope._newMatch = {};

    $scope._resetNewMatch = function () {
        $scope._newMatch = {
            name: '',
            date: new Date(),
            description: '',
            address: ''
        };
    }

    $scope._resetNewMatch();

    $scope.goToMatch = goToMatch;

    matchesService.getMatches().then(function(matches) {
        $scope.matches = matches;
    }, function (reason) {
        console.log('reason ', reason);
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
        // DAR UM POST PARA O SERVIDOR E VER O RESULTADO
        $scope.matches.push($scope._newMatch);
        $scope.newMatchView.hide();
        $scope._resetNewMatch();
    }
}