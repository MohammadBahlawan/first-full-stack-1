var app = angular.module("PostApp");

app.service("PostService", ["$http", function ($http) {
    var self = this;
    this.PostList = [];

    this.getPosts = function () {
        return $http.get("/api/Post").then(function (response) {
            self.PostList = response.data;
            return response.data;
        });
    }
    this.addPost = function (newPost) {
        return $http.post("/api/Post", newPost).then(function (response) {
            self.PostList.push(response.data);
        });
    }

    this.deletePost = function (Post, index) {
        return $http.delete("/api/Post/" + Post).then(function (response) {
            self.PostList.splice(index, 1);
        });
    }
    this.UpdatePost = function (Post) {
        return $http.put("/api/Post/" + Post._id, Post).then(function (response) {
            for (var i = 0; i < self.PostList.length; i++) {
                if (self.PostList[i]._id === response.data._id) {
                    self.PostList[i] = response.data;
                }
            }
        });
    };
}]);