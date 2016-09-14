var express = require("express");
var authRouter = express.Router();
var User = require("../models/User");
var jwt = require("jsonwebtoken");
var config = require("../config");

authRouter.post("/login", function(req, res) {
    User.findOne({email: req.body.email}, function(err, User) {
        if (err) {
            res.status(500).send(err);
        } else if (!User) {
            res.status(404).send({message: "That email doesn't exist in our system", success: false});
        } else if (User) {
            if (User.password !== req.body.password) {
                res.status(401).send({message: "Incorrect password", success: false})
            } else {
                var token = jwt.sign(User.toObject(), config.secret);
                res.send({token: token, User: User.toObject(), message: "Access granted!", success: true});
            }
        }
    })
});

authRouter.post("/signup", function(req, res) {
    User.find({email: req.body.email}, function(err, existingUser) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (existingUser.length) {
                res.send({message: "That email already exists in our system. Try signing in.", success: false});
            } else {
                var newUser = new User(req.body);

                newUser.save(function(err) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.send({message: "Successfully created a new User", success: true, User: newUser});
                    }
                });
            }
        }
    })

});

module.exports = authRouter;
