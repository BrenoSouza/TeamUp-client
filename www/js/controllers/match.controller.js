angular.module('TeamUp').controller('MatchCtrl', MatchCtrl);


function MatchCtrl($scope, $state, $ionicModal, matchService, SessionService, $window) {

    $scope.match = {};
    $scope._editedMatch = {};
    $scope._user = SessionService.getUser();
    $scope.hasAction = false;

    // $scope.isFloatActive = false;

    // pending-requests functions
    $scope.acceptRequest = acceptRequest;
    $scope.rejectRequest = rejectRequest;

    // edit-match functions
    $scope._resetEditedMatch = _resetEditedMatch;
    $scope.openEditMatchView = openEditMatchView;
    $scope.closeEditMatchView = closeEditMatchView;
    $scope.saveChanges = saveChanges;

    matchService.getMatch($state.params.id).then(function (response) {
        $scope.match = matchService.matchParser(response.data);
        _mockado($scope.match);
        console.log('match ', $scope.match);
        $scope._resetEditedMatch();
        _defineBarAction();
    }, function (error) {
        console.log('error ', error);
    });

    function _mockado(match) {
        match.guestsRequests = [
            {
                name: 'Rafael',
                email: 'klynger@ufcg.edu'
            },
            {
                name: 'Vinicius',
                email: 'vinicius@globo.com'
            },
            {
                name: 'Ronaldo Medeiros',
                email: 'rmedeiros@bol.com.br'
            },
            {
                name: 'Heitor Miranda',
                email: 'miranda98@gmail.com'
            },
            {
                name: 'Breno Souza',
                email: 'souza@hotmail.com'
            }
        ];

        match.guests = [
            {
                name: 'Rafaela',
                email: 'rafaela@ufcg.com'
            },
            {
                name: 'felipe',
                email: 'felipe@gmail.com'
            },
            {
                name: 'Victor',
                email: 'victor@bol.com.br'
            },
            {
                name: 'Raimundo',
                email: 'raimundo354@hotmail.com'
            },
            {
                name: 'Thierry',
                email: 'thierry@uol.com.br'
            }
        ];
    }

    // matchService.getMatchRequests($state.params.id).then(function (response) {
    //     $scope.match.guestsRequests = response.data;
    //     console.log('pegou ', response.data);
    // }, function(error) {
    //     console.log('error ', error);
    // });

    function rejectRequest(id) {

        const guestsRequests = $scope.match.guestsRequests;
        for (var i = 0; i < guestsRequests.length; i++) {
            if (guestsRequests[i].id === id) {
                delete guestsRequests[i];
                break;
            }
        }
        $window.location.reload();
    }

    function acceptRequest(id) {
        const guestsRequests = $scope.match.guestsRequests;
        var user;
        for (var i = 0; i < guestsRequests.length; i++) {
            if (guestsRequests[i].id === id) {
                user = guestsRequests[i];
                delete guestsRequests[i];
                break;
            }
        }

        $scope.match.members.push(user);
        $window.location.reload();
    }

    function _defineBarAction() {
        if ($scope.match.idOwner === $scope._user.id) {
            $scope.hasAction = true;
            $scope.actionBarButtonText = 'Excluir Partida';
            $scope.barButtonAction = _deleteMatch;

        } else if ($scope.match.guests.indexOf($scope._user.id) <= -1
            && $scope.match.guestsRequests.indexOf($scope._user.id) <= -1) {
            $scope.hasAction = true;
            $scope.actionBarButtonText = 'Entrar na partida';
            $scope.barButtonAction = _joinMatch;

        } else if ($scope.match.guestsRequests.indexOf($scope._user.id) > -1) {
            $scope.hasAction = false;
            $scope.actionBarButtonText = undefined;
            $scope.barButtonAction = undefined;
        } else {
            $scope.hasAction = true;
            $scope.actionBarButtonText = 'Sair';
            $scope.barButtonAction = _leaveMatch;

        }
    }


    function _joinMatch() {
        matchService.requestJoinMatch($scope.match.id).then(function (response) {
            console.log('request feito ', response);
        }, function (response) {
            console.log('#deuRuim ', response);
        });
    }

    function _deleteMatch() {
        matchService.deleteMatch($scope.match.id).then(function (response) {
            console.log('response ', response);
        }, function (error) {
            console.log('errou ', error);
        });
        $state.go('app.matches', {}, { reload: true });
        $window.location.reload();
    }

    function _leaveMatch() {
        console.log('leave match');
    }


    // EDIT MATCH MODAL
    function _resetEditedMatch() {
        $scope._editedMatch.name = $scope.match.name;
        $scope._editedMatch.address = $scope.match.address;
        $scope._editedMatch.dat = $scope.match.date;
        $scope._editedMatch.sport = $scope.match.sport
        $scope._editedMatch.description = $scope.match.description;
    }

    function openEditMatchView() {
        $scope.editMatchView.show();
    }

    function closeEditMatchView() {
        $scope.editMatchView.hide();
    }

    function saveChanges() {
        $scope.match = {
            name: $scope._editedMatch.name,
            address: $scope._editedMatch.address,
            date: $scope._editedMatch.date,
            sport: $scope._editedMatch.sport,
            description: $scope._editedMatch.description
        };
        $scope.editMatchView.hide();
    }


    $ionicModal.fromTemplateUrl('templates/edit-match.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.editMatchView = modal;
    });

    $scope.$on('$destroy', function () {
        $scope.editMatchView.remove();
    });

    // function toggleActionsFloatButton() {
    //     $scope.isFloatActive = !$scope.isFloatActive;
    // }

}
