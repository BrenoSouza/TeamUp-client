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
        console.log('match ', $scope.match);
        $scope._resetEditedMatch();
        _defineBarAction();

        if ($scope._user.id === $scope.match.idOwner) {
            matchService.getMatchRequests($state.params.id).then(function (response) {
                $scope.match.guestsRequests = response.data;
                console.log('match requests ', $scope.match.guestsRequests);
            }, function (error) {
                console.log('error ', error);
            });
        }

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
                email: 'thierry@uol.com.brx'
            }
        ];
    }

    function rejectRequest(id) {

        matchService.rejectMatchRequest($scope.match.id, id)
            .then(function (response) {
                console.log('rejeitooou!!! ', response);
                $scope.match.guestsRequests = $scope.match.guestsRequests.filter(function (user) {
                    return user.id !== id;
                });
            }, function (error) {
                console.log('errou ', error);
            });
    }

    function acceptRequest(id) {

        matchService.acceptMatchRequest($scope.match.id, id)
            .then(function (response) {
                console.log('aceitoou!!! ', response);
                $scope.match.guestsRequests = $scope.match.guestsRequests.filter(function (user) {
                    return user.id !== id;
                });
            }, function (error) {
                console.log('errooou!! ', error);
            });
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
            $scope.match = matchService.matchParser(response.data);
        }, function (response) {
            console.log('#deuRuim ', response);
        });
    }

    function _deleteMatch() {

        matchService.deleteMatch($scope.match.id).then(function (response) {

            $state.go('app.matches', {}, { reload: true });
            $window.location.reload();
        }, function (error) {
            console.log('errou ', error);
        });

    }

    function _leaveMatch() {
        matchService.leaveMatch($scope.match.id)
            .then(function(response) {
                console.log('LEAVOOOOU!!!', response);
            }, function(error) {
                console.log('NÃO LEAVOOOU DEU ERRO ', error);
            });
    }


    // EDIT MATCH MODAL
    function _resetEditedMatch() {
        $scope._editedMatch.name = $scope.match.name;
        $scope._editedMatch.address = $scope.match.address;
        $scope._editedMatch.date = $scope.match.date;
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

        const matchJSON = matchService.matchParseToJSON($scope._editedMatch);

        matchService.editMyMatch($scope.match.id, matchJSON).then(function (response) {
            console.log('funcionou!!! ', response);

            $scope.match = matchService.matchParser(response.data);

            $scope.editMatchView.hide();
        }, function (error) {
            console.log('#deuRuim ', error);
        });

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
