angular.module('TeamUp').controller('MatchCtrl', MatchCtrl);


function MatchCtrl($scope, $state, $ionicModal, matchService, SessionService, $window) {

    $scope.match = {};
    $scope._editedMatch = {};
    $scope._user = SessionService.getUser();
    $scope.hasAction = false;

    // Disable flags
    $scope.isBarButtonDisabled = false;
    $scope.isSaveChangesEditButtonDisabled = false;
    $scope.isPendingRequestActionDisabled = false;

    // loadings
    $scope.isLoadingMembers = true;
    $scope.isLoadingMatchDetails = true;
    $scope.isLoadingPendingRequests = true;

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
        $scope.isLoadingMatchDetails = false;

        if ($scope._user.id === $scope.match.idOwner) {
            matchService.getMatchRequests($state.params.id).then(function (response) {
                $scope.guestsRequests = response.data;
                $scope.isLoadingPendingRequests = false;
                console.log('match requests ', $scope.match.guestsRequests);
            }, function (error) {
                $scope.isLoadingPendingRequests = false;
                console.log('error ', error);
            });
        }

        matchService.getMatchMembers($state.params.id).then(function (response) {
            $scope.guests = response.data;
            $scope.isLoadingMembers = false;
            console.log('match Members ', response);
        }, function (error) {
            $scope.isLoadingMembers = false;
            console.log('Match members #deuRuim ', error);
        });

    }, function (error) {
        $scope.isLoadingMatchDetails = false;
        console.log('error ', error);
    });

    function rejectRequest(id) {

        if (!$scope.isPendingRequestActionDisabled) {

            $scope.isPendingRequestActionDisabled = true;

            matchService.rejectMatchRequest($scope.match.id, id)
                .then(function (response) {
                    console.log('rejeitooou!!! ', response);
                    $scope.match.guestsRequests = $scope.match.guestsRequests.filter(function (userId) {
                        return userId !== id;
                    });

                    $scope.guestsRequests = $scope.guestsRequests.filter(function (user) {
                        return user.id !== id;
                    });

                    $scope.isPendingRequestActionDisabled = false;

                }, function (error) {

                    console.log('errou ', error);
                    $scope.isPendingRequestActionDisabled = false;
                });
        }

    }

    function acceptRequest(id) {

        if (!$scope.isPendingRequestActionDisabled) {

            $scope.isPendingRequestActionDisabled = true;

            matchService.acceptMatchRequest($scope.match.id, id)
                .then(function (response) {
                    console.log('aceitoou!!! ', response);

                    $scope.match.guestsRequests = $scope.match.guestsRequests.filter(function (userId) {
                        return userId !== id;
                    });

                    $scope.guestsRequests = $scope.guestsRequests.filter(function (user) {
                        return user.id !== id;
                    });

                    $scope.match.guests.push(id);

                    $scope.isLoadingMembers = true;
                    matchService.getMatchMembers($state.params.id).then(function (response) {
                        $scope.guests = response.data;
                        $scope.isLoadingMembers = false;
                        console.log('match Members ', response);
                    }, function (error) {
                        $scope.isLoadingMembers = false;
                        console.log('Match members #deuRuim ', error);
                    });

                    $scope.isPendingRequestActionDisabled = false;

                }, function (error) {

                    console.log('errooou!! ', error);
                    $scope.isPendingRequestActionDisabled = false;
                });
        }

    }

    function _defineBarAction() {

        if ($scope.match.idOwner === $scope._user.id) {
            $scope.hasAction = true;
            $scope.actionBarButtonText = 'Excluir Partida';
            $scope.barButtonAction = _deleteMatch;

        } else if ($scope.match.guestsRequests.includes($scope._user.id)) {
            $scope.hasAction = true;
            $scope.actionBarButtonText = 'Pedido Enviado';
            $scope.barButtonAction = function () { };
            $scope.isBarButtonDisabled = true;

        } else if ($scope.match.guests.includes($scope._user.id)) {
            $scope.hasAction = true;
            $scope.actionBarButtonText = 'Sair';
            $scope.barButtonAction = _leaveMatch;
            $scope.isBarButtonDisabled = false;

        } else {
            $scope.hasAction = true;
            $scope.actionBarButtonText = 'Entrar na partida';
            $scope.barButtonAction = _joinMatch;
            $scope.isBarButtonDisabled = false;
        }
    }


    function _joinMatch() {

        if (!$scope.isBarButtonDisabled) {

            $scope.isBarButtonDisabled = true;

            matchService.requestJoinMatch($scope.match.id).then(function (response) {
                console.log('request feito ', response);
                $scope.match = matchService.matchParser(response.data);
                _defineBarAction();

            }, function (response) {
                _defineBarAction();
                console.log('#deuRuim ', response);
            });
        }
    }

    function _deleteMatch() {

        if (!$scope.isBarButtonDisabled) {

            $scope.isBarButtonDisabled = true;

            matchService.deleteMatch($scope.match.id).then(function (response) {

                $state.go('app.matches', {}, { reload: true });
                $window.location.reload();
                $scope.isBarButtonDisabled = false;
            }, function (error) {
                $scope.isBarButtonDisabled = false;
                console.log('errou ', error);
            });
        }

    }

    function _leaveMatch() {

        if (!$scope.isBarButtonDisabled) {
            $scope.isBarButtonDisabled = true;
            matchService.leaveMatch($scope.match.id)
                .then(function (response) {
                    console.log('Saiu da partida', response);
                    _defineBarAction();
                }, function (error) {
                    $scope.isBarButtonDisabled = false;
                    console.log('NÃO LEAVOOOU DEU ERRO ', error);
                });
        }
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

        if (!$scope.isSaveChangesEditButtonDisabled) {

            $scope.isSaveChangesEditButtonDisabled = true;

            const matchJSON = matchService.matchParseToJSON($scope._editedMatch);

            matchService.editMyMatch($scope.match.id, matchJSON).then(function (response) {
                console.log('funcionou!!! ', response);

                $scope.match = matchService.matchParser(response.data);

                $scope.editMatchView.hide().then(function () {
                    $scope.isSaveChangesEditButtonDisabled = false;
                }, function (error) {
                    console.log('deu erro na hora de fechar o modal WTF? ', error);
                    $scope.isSaveChangesEditButtonDisabled = false;
                });
            }, function (error) {
                console.log('#deuRuim ', error);
            });
        }


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
