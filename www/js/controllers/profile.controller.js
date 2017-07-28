angular.module('TeamUp').controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl($scope) {
    $scope.user = {
        name: 'Rafael Klynger',
        profilePhoto: 'img/profile_default.svg'
    }
}
