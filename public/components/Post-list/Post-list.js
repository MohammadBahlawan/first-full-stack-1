var app = angular.module("PostApp");

app.controller("PostListController", ["$scope", "PostService", "StoreService", function ($scope, PostService, StoreService) {
    $scope.PostService = PostService;
    $scope.StoreService = StoreService;

    $scope.editing = false;
    var postCopy = {};
    StoreService.getStores().then(function(response) {
        console.log(response.data);
    });

    PostService.getPosts().then(function(data) {
        console.log(data);
    });

    $scope.addPost = function (newPost) {
        //        console.log("new post from drop down: " + newPost.selectedStore)
        PostService.addPost(newPost).then(function () {
            $scope.newPost = {};
        });
    };

    $scope.deletePost = function (Post, index) {
        PostService.deletePost(Post, index);
    };

    $scope.updatePost = function (Post) {
        PostService.UpdatePost(Post).then(function () {
            Post.editing = false;
        });
    };

    $scope.likesPost = function (Post, index) {
        Post.likes = Post.likes + 1;
        PostService.UpdatePost(Post, index);
    };

    $scope.unlikesPost = function (Post, index) {
        Post.likes = Post.likes - 1;
        PostService.UpdatePost(Post, index);
    };

    $scope.edit = function (post) {
        postCopy = angular.copy(post);
        //        console.log(post);
        post.editing = true;
    };

    $scope.cancelEdit = function (post) {
        post.editing = false;
        post.title = postCopy.title
        post.description = postCopy.description
        post.img_url = postCopy.img_url
    };

 }]);