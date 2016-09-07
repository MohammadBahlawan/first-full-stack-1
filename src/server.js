var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var morgan = require("morgan");
var port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(express.static("../public"));

// Routes \\
app.use("/api/Post", require("./routes/PostRoutes"));

mongoose.connect("mongodb://localhost/beirut-Posts", function () {
    console.log("Database is connected");
});


app.listen(port, function () {
    console.log("server is running on port " + port);
});