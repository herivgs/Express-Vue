var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var users = names = {};

server.listen(3000);


app.get('/', function (req, res) {
  res.send('Hello World!')
});

function logData(message) {
  var d = new Date();
  var time = '[' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ']: ';
  console.log(time, message);
}

logData("Chat server has booted...");
io.on('connection', function(socket) {

  socket.on('join', function(user) {
    var CHANNEL = user[0];
    var USERID = user[1];
    var USERNAME = user[2];

    logData('User ' + USERNAME + '  has connected to chanel ' + CHANNEL + ".");
    socket.userId = USERID;
    socket.userName = USERNAME;

    users[USERID] = socket;

    names[users[1]] = {
      "name": USERNAME,
      'socketId': socket.id
    }

    function updateNames() {
      io.emit('chat.' + USERID, names);
    }

    // updateNames();

    socket.on('chat', function (payload) {
      io.emit('chat.' + payload[0], payload);
      console.log(payload);
    });

    socket.on('disconnect', function () {
      if(!socket.name) return;
        delete users[user[USERNAME]];
        delete names[user[USERNAME]];

        updateNames();
    });
  });
});
