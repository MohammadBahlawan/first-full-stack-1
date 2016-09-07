var app = angular.module("PostApp");

app.controller("PostListController", ["$scope", "PostService", function ($scope, PostService) {
    $scope.PostService = PostService;
    $scope.editing = false;
    var postCopy = {};
    // $scope.PostList = PostService.PostList;

    PostService.getPosts();

    $scope.addPost = function (newPost) {
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
        post.editing = true;
    };

    $scope.cancelEdit = function (post) {
        post.editing = false;
        post.title = postCopy.title
        post.description = postCopy.description
        post.img_url = postCopy.img_url
    };

 }]);