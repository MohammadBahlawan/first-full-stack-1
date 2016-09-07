var mongoose = require("mongoose");
var PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        
    },
    description: String,
    completed: {
        type: Boolean,
        default: false
    },
   
    likes: {
    type:Number
    },
    img_url:{
        type:String
    }
});
module.exports = mongoose.model("Post", PostSchema);