var express = require("express");
var PostRoutes = express.Router();
var Post = require("../models/Post");
PostRoutes.route("/")
    .get(function (req, res) {
        Post.find(function (err, Posts) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(Posts);
            }
        });
    })
    .post(function (req, res) {
        var newPost = new Post(req.body)
        newPost.likes = 0;
        newPost.save(function (err, newPostObj) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send(newPostObj);
            }

        });
    });
PostRoutes.route("/:id").get(function (req, res) {
        Post.findById(req.params.id, function (err, PostObj) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(PostObj);
            }
        });

    })
    .put(function (req, res) {
        Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }, function (err, updatedPost) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(updatedPost);
            }
        });
    })
    .delete(function (req, res) {
        Post.findByIdAndRemove(req.params.id, function (err, deletedPost) {
            if (err) {
                res.status(500).send(err);
            } else {
                var responseObj = {
                    success: true,
                    massage : "Successfully deleted the Post",
                    Post:deletedPost
                    };
                res.send(responseObj);
            }

        });
    });
module.exports = PostRoutes;