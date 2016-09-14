var app = angular.module("PostApp");

app.service("PostService", ["$http", function ($http) {
    var self = this;
    this.PostList = [];
    //get all stores and put in specific array 
    this.getStores = function () {
        return $http.get("/api/Post").then(function (response) {
            self.PostList = response.data;
            return response.data;
        });
    }
    this.getPosts = function () {
        return $http.get("/api/Post").then(function (response) {
            self.PostList = response.data;
            return response.data;
        });
    }

    this.addPost = function (newPost) {
        console.log("newPost");
        console.log(newPost);
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


app.service("StoreService", ["$http", function ($http) {
    var self = this;
    this.StoreList = [];
    this.StoreListobj = {};
    //get all stores and put in specific array 
    this.getStores = function () {
        return $http.get("/api/Store").then(function (response) {
            self.StoreList = response.data;
//            console.log(self.StoreList);
//            for (var i in response.data) {
//                self.StoreListobj.id = response.data[i]._id;
//                self.StoreListobj.name = response.data[i].name;
//                self.StoreList.push(self.StoreListobj);
//                console.log(self.StoreListobj);
//                self.StoreListobj = {};
//            }
//            console.log("self.StoreList")
//            console.log(self.StoreList)
            return response;
        });
    }
}]);