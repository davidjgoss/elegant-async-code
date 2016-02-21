/*
here, we're just newing up an instance of express, purely to use as an http server
for our static files (since ajax calls may not work over `file://`)
putting it in `server.js` means it will run on `npm start` with no config
 */
var express = require("express"),
    open = require("open");

var app = express();
app.use("", express.static("./"));
app.listen(3000);
open("http://localhost:3000/");
console.log("Running on port 3000, hit Ctrl+C to stop");