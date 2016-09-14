var mongoose = require("mongoose");
var storeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true

    },
    brand: {
        type: String


    },

    type: {
        type: String
    }

});
module.exports = mongoose.model("store", storeSchema);