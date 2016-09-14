var mongoose = require("mongoose");
var PurchasesSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true

    },
    model: {
        type: String


    },

    price: {
        type: String
    }

});
module.exports = mongoose.model("Purchases", PurchasesSchema);