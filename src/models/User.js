var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    Age: String,
    email: { // Doubles as a username
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
            //        min: 8,

    },
    admin: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model("User", UserSchema);