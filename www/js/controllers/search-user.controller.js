angular.module('TeamUp').controller('SearchUserCtrl', SearchUserCtrl);

function SearchUserCtrl($scope, $state, $http, Constants) {

    $scope.searchResult = [];
    $scope.allUsers = [];
    $scope.search = {
        searchCamp: ''
    };
    $scope.goToUser = goToUser;
    $scope.filterUsers = filterUsers;
    $scope.isLoading = true;

    $http.get(Constants.USER).then(function (response) {
        $scope.allUsers = response.data;
        $scope.searchResult = response.data;
        $scope.isLoading = false;
        console.log('response ', response.data);
    }, function (error) {
        console.log('error ', error);
    });

    function goToUser(id) {
        $state.go('app.viewProfile', { id: id }, { reload: true });
    }

    function filterUsers() {

        const searchStr = $scope.search.searchCamp.toLowerCase();
        $scope.searchResult = $scope.allUsers.filter(function(user) {
            return user.name.toLowerCase().includes(searchStr) 
                || user.email.toLowerCase().includes(searchStr);
        });

    }
}