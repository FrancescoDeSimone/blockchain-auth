const express = require("express"),
 app          = require("express")(),
 http         = require("http").Server(app),
 io           = require("socket.io")(http),
 port         = process.env.PORT || 3000,
 mdns         = require("mdns-js"),
 Web3         = require('web3'),
 contract     = require("truffle-contract"),
 path         = require('path'),
 contractJSON = require(path.join(__dirname, 'build/contracts/Auth.json')),
 bodyParser   = require('body-parser');


const provider    = new Web3.providers.HttpProvider("http://localhost:7545");
const blockauth   = contract(contractJSON);
blockauth.setProvider(provider);

io.on("connection", function(socket) {
  let browser = mdns.createBrowser();
  browser.on("ready", () => {
    browser.discover();
  });
  browser.on("update", function(msg) {
    console.log(msg)
    if(msg.type[0].name == 'ssh')
      io.emit("devices", JSON.stringify(msg));
  });
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/verifyDevice", function(req, res) {
  blockauth.deployed().then(function(instance) {
    return instance.verifyDevice(req.body.passwd, {from: req.body.account})
  }).then(
    result => res.send(result),
    error => console.log(error)
    )
});

app.post("/registerDevice", function(req, res) {
  blockauth.deployed().then(function(instance) {
    return instance.registerDevice(req.body.passwd,{from: req.body.account})
  }).then(
    result => res.send(result),
    error => console.log(error)
    )
});

http.listen(port, function() {
  console.log("listening on *:" + port);
});
