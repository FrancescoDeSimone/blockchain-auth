const express = require('express');
const app = express();
const addr = require('node-macaddress').networkInterfaces();

var cors = require('cors')
app.use(cors())
console.log(addr)

app.get('/', function (req, res) {
  res.send(addr.eth0.mac);
});


app.listen(3000, function () {
  console.log('listening on port 3000!');
});
