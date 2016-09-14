var app = angular.module("PostApp.Auth");

app.controller("LoginController", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {

    $scope.login = function (User) {
        UserService.login(User).then(function (response) {
            $location.path("/");
        }, function (response) {
            alert(response.data.message);
        });
    };
}]);
