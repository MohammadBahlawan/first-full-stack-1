var express = require("express");
var PurchasesRoutes = express.Router();
var Purchases = require("../models/Purchases");
PurchasesRoutes.route("/")
    .get(function (req, res) {
        Purchases.find(function (err, Purchasess) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(Purchasess);
            }
        });
    })
    .post(function (req, res) {
        var newPurchases = new Purchases(req.body)
        newPurchases.likes = 0;
        newPurchases.save(function (err, newPurchasesObj) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send(newPurchasesObj);
            }

        });
    });
PurchasesRoutes.route("/:id").get(function (req, res) {
        Purchases.findById(req.params.id, function (err, PurchasesObj) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(PurchasesObj);
            }
        });

    })
    .put(function (req, res) {
        Purchases.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }, function (err, updatedPurchases) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(updatedPurchases);
            }
        });
    })
    .delete(function (req, res) {
        Purchases.findByIdAndRemove(req.params.id, function (err, deletedPurchases) {
            if (err) {
                res.status(500).send(err);
            } else {
                var responseObj = {
                    success: true,
                    massage : "Successfully deleted the Purchases",
                    Purchases:deletedPurchases
                    };
                res.send(responseObj);
            }

        });
    });
module.exports = PurchasesRoutes;