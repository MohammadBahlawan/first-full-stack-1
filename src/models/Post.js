var mongoose = require("mongoose");
var PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: String,
    completed: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Number,
        default: 0
    },
    img_url: String,
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true
    }
});


module.exports = mongoose.model("Post", PostSchema);