angular.module('TeamUp').controller('MatchCtrl', MatchCtrl);


function MatchCtrl($scope, $state, $ionicModal, matchService, SessionService, $window) {

    $scope.match = {};
    $scope._editedMatch = {};
    $scope._user = SessionService.getUser();

    // $scope.isFloatActive = false;
    $scope.barButtonAction = barButtonAction;

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
        defineBarbuttonText();
    }, function (error) {
        console.log('error ', error);
    });

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

    function defineBarbuttonText() {
        if($scope.match.idOwner === $scope._user.id) {
            $scope.actionBarButtonText = 'Excluir Partida';
        } else {
            $scope.actionBarButtonText = 'Sair';
        }
        
    }

    function barButtonAction() {
        if($scope.match.idOwner === $scope._user.id) {
            _deleteMatch();    
        } else {
            _leaveMach();
        }
    }


    function _deleteMatch() {
        matchService.deleteMatch($scope.match.id).then(function (response) {
            console.log('response ', response);
        }, function(error) {
            console.log('errou ', error);
        });
        $state.go('app.matches', {}, { reload: true });
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
