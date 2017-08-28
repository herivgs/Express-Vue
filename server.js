var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.listen(3001);
console.log("listeing on http://localhost:3001")
