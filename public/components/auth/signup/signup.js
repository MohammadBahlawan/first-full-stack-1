var app = angular.module("PostApp.Auth");

app.controller("SignupController", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {
    $scope.passwordMessage = "";

    $scope.signup = function (User) {
        if (User.password !== $scope.passwordRepeat) {
            $scope.passwordMessage = "Passwords do not match.";
        } else {
            console.log(User)
            UserService.signup(User).then(function (response) {
                $location.path("/");
            }, function (response) {
                alert("There was a problem: " + response.data);
            });
        }
    }
}]);
