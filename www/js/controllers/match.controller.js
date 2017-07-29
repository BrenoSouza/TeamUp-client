angular.module('TeamUp').controller('MatchCtrl', MatchCtrl);


function MatchCtrl($scope, $state, $ionicModal, matchService) {

    $scope.match = {};
    $scope._editedMatch = {};

    // $scope.isFloatActive = false;
    $scope.actionBarButtonText = 'Sair';


    $scope.leaveMatch = leaveMatch;
    $scope.barButtonAction = barButtonAction;

    // edit-match functions
    $scope._resetEditedMatch = _resetEditedMatch;
    $scope.openEditMatchView = openEditMatchView;
    $scope.closeEditMatchView = closeEditMatchView;
    $scope.saveChanges = saveChanges;


    matchService.getMatch($state.params.id).then(function (match) {
        $scope.match = match;
        $scope._resetEditedMatch();
    }, function (error) {
        console.log('error ', error);
    });

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
