var app = angular.module("PostApp", ["ngRoute","PostApp.Auth"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/Post-list/Post-list.html",
            controller: "PostListController"
        })
        .when("/new-Post", {
            templateUrl: "components/new-Post/new-Post.html",
            controller: "PostListController"
        });
// .when("/login", {
//            templateUrl: "components/auth/login/login.html"
//        });
}]);