var express = require("express");
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;
var mdns = require("mdns-js");

io.once("connection", function(socket) {
  let browser = mdns.createBrowser();
  browser.on("ready", () => {
    browser.discover();
  });
  browser.on("update", function(msg) {
    if(msg.type[0].name == 'ssh')
      io.emit("devices", JSON.stringify(msg));
  });
});

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

http.listen(port, function() {
  console.log("listening on *:" + port);
});
