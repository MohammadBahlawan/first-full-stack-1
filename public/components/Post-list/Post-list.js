var app = angular.module("PostApp");

app.controller("PostListController", ["$scope", "PostService", function ($scope, PostService) {
    $scope.PostService = PostService;
    $scope.editing = false;
    // $scope.PostList = PostService.PostList;

    PostService.getPosts()


    $scope.addPost = function (newPost) {
        PostService.addPost(newPost).then(function () {
            $scope.newPost = {};
        })


    }

    $scope.deletePost = function (Post, index) {
        PostService.deletePost(Post, index);

    }
    $scope.updatePost = function (Post) {
        Post.img_url = Post.newImg;
        PostService.UpdatePost(Post).then(function () {
            Post.editing = false;
        })
    }
    $scope.likesPost = function (Post, index) {
        Post.likes = Post.likes + 1;
        PostService.UpdatePost(Post, index);
    }

    $scope.unlikesPost = function (Post, index) {
        Post.likes = Post.likes - 1;
        PostService.UpdatePost(Post, index);
    }

 }]);