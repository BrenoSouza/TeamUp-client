angular.module('TeamUp').controller('MatchCtrl', MatchCtrl);


function MatchCtrl($scope, $state, $ionicModal, matchService, $window) {

    $scope.match = {};
    $scope._editedMatch = {};

    // $scope.isFloatActive = false;
    $scope.actionBarButtonText = 'Sair';

    $scope.leaveMatch = leaveMatch;
    $scope.barButtonAction = barButtonAction;

    // pending-requests functions
    $scope.acceptRequest = acceptRequest;
    $scope.rejectRequest = rejectRequest;

    // edit-match functions
    $scope._resetEditedMatch = _resetEditedMatch;
    $scope.openEditMatchView = openEditMatchView;
    $scope.closeEditMatchView = closeEditMatchView;
    $scope.saveChanges = saveChanges;

    // lista temporária
    _pendingRequests = [
        {
            name: 'Rafael',
            id: 1
        },
        {
            name: 'Klynger',
            id: 2
        },
        {
            name: 'Silva',
            id: 3
        },
        {
            name: 'Dantas',
            id: 4
        },
        {
            name: 'José',
            id: 5
        },
        {
            name: 'Souza',
            id: 6
        }
    ];

    _members = [
        {
            name: 'Ronaldo',
            id: 7
        },
        {
            name: 'Medeiros',
            id: 8
        },
        {
            name: 'Vinicius',
            id: 9
        },
        {
            name: 'Thierry'
            ,
            id: 10
        },
        {
            name: 'Heitor',
            id: 11
        },
        {
            name: 'Jose Souza',
            id: 12
        }
    ];

    matchService.getMatch($state.params.id).then(function (match) {
        $scope.match = match;
        $scope.match.pendingRequests = _pendingRequests;
        $scope.match.members = _members;
        $scope._resetEditedMatch();
    }, function (error) {
        console.log('error ', error);
    });

    function rejectRequest(id) {

        const pendingRequests = $scope.match.pendingRequests;
        for (var i = 0; i < pendingRequests.length; i++) {
            if (pendingRequests[i].id === id) {
                delete pendingRequests[i];
                break;
            }
        }
        $window.location.reload();
    }

    function acceptRequest(id) {
        const pendingRequests = $scope.match.pendingRequests;
        var user;
        for (var i = 0; i < pendingRequests.length; i++) {
            if (pendingRequests[i].id === id) {
                user = pendingRequests[i];
                delete pendingRequests[i];
                break;
            }
        }

        $scope.match.members.push(user);
        $window.location.reload();
    }

    function defineActionLeaveOrDeleteMatch() {
        $scope.actionBarButtonText = 'Excluir Partida';
    }

    function barButtonAction() {
        leaveMach();
        //deleteMatch();
    }


    function deleteMatch() {
        console.log('delete match');
    }

    function leaveMatch() {
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
