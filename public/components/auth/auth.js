var app = angular.module("PostApp.Auth",[]);

app.config(["$routeProvider", function ($routeProvider) {

    $routeProvider
        .when("/signup", {
            templateUrl: "components/auth/signup/signup.html",
            controller: "SignupController"
        })
        .when("/login", {
            templateUrl: "components/auth/login/login.html",
            controller: "LoginController"
        })
}]);


app.service("TokenService", [function () {
    var UserToken = "token";

    this.setToken = function (token) {
        localStorage[UserToken] = token;
    };

    this.getToken = function () {
        return localStorage[UserToken];
    };

    this.removeToken = function () {
        localStorage.removeItem(UserToken);
    };
}]);


app.service("UserService", ["$http", "TokenService", function ($http, TokenService) {

    this.signup = function (User) {
        return $http.post("/auth/signup", User);
    };

    this.login = function (UserCreds) {
        return $http.post("/auth/login", UserCreds).then(function (response) {
            TokenService.setToken(response.data.token);
            return response;
        });
    };

    this.logout = function () {
        TokenService.removeToken();
    };
}]);


app.service("AuthInterceptor", ["$q", "$location", "TokenService", function ($q, $location, TokenService) {
    this.request = function (config) {
        var token = TokenService.getToken();

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    };

    this.responseError = function (response) {
        if (response.status === 401) {
            TokenService.removeToken();
            $location.path("/login");
        }
        return $q.reject(response);
    };
}]);

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
}]);
