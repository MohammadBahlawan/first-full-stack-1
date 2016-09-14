var express = require("express");
var StoreRoutes = express.Router();
var Store = require("../models/Store");
StoreRoutes.route("/")
    .get(function (req, res) {
        Store.find(function (err, Stores) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(Stores);
            }
        });
    })
    .post(function (req, res) {
        var newStore = new Store(req.body)
        newStore.likes = 0;
        newStore.save(function (err, newStoreObj) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send(newStoreObj);
            }

        });
    });
StoreRoutes.route("/:id").get(function (req, res) {
        Store.findById(req.params.id, function (err, StoreObj) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(StoreObj);
            }
        });

    })
    .put(function (req, res) {
        Store.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }, function (err, updatedStore) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(updatedStore);
            }
        });
    })
    .delete(function (req, res) {
        Store.findByIdAndRemove(req.params.id, function (err, deletedStore) {
            if (err) {
                res.status(500).send(err);
            } else {
                var responseObj = {
                    success: true,
                    massage : "Successfully deleted the Store",
                    Store:deletedStore
                    };
                res.send(responseObj);
            }

        });
    });
module.exports = StoreRoutes;