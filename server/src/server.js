var https  = require('http'),
    sio      = require('socket.io'),
    port    = process.env.PORT || 8080,
    host    = process.env.YOUR_HOST || '0.0.0.0',
    User    = require('./User'),
    UsersList    = require('./UsersList'),
    LoggerShell  = require('./LoggerShell'),
    express = require("express"),
    fs = require('fs'),
    path = require('path'),
    app = express();

var baseFolder = path.join(__dirname, '..', '..');

app.use(express.static(baseFolder));

var webServer = https.createServer(app);
webServer.listen(port, host);

var io = sio.listen(webServer, { log: true });
var usersList = new UsersList();
var logger = new LoggerShell();


io.sockets.on('connection', function(socket) {
    var user = new User(socket);
    usersList.addUser(socket.id, user);

    socket.on('username', function(data) {
        logger.log("Client Connected:", data);
        user.setUserName(data.username);
        socket.broadcast.emit('userConnected', {id: socket.id, name: data.username});
        socket.emit('userList', {list: usersList.getAllUsers()});
    });

    socket.on('publishSDP', function(data) {
        logger.log("*** publishSDP: ", "FROM: "+socket.id, " TO: "+data.socketid);
        user.setSDP(data.data.SDP);
        var otherUser = usersList.getUser(data.socketid);
        otherUser.emitData({id: socket.id, data: data.data}, 'SDPReceived');
    });

    socket.on('answerSDP', function(data) {
        logger.log("*** answerSDP: ", "FROM: "+socket.id, " TO: "+data.socketid);
        var otherUser = usersList.getUser(data.socketid);
        otherUser.setSDP(data.data.SDP);
        otherUser.emitData({id: socket.id, data: data.data}, 'AnswerSDPReceived');
    });

    socket.on('publishIce', function(data) {
        logger.log("*** publishIce: ", "FROM: "+socket.id, " TO: "+data.socketid);
        user.setICE(data);
        var otherUser = usersList.getUser(data.socketid);
        otherUser.emitData({id: socket.id, data: data.data}, 'ICEReceived');
    });

    socket.on('sendMessage', function(data) {
        logger.log("*** " + socket.id + " sending message to "+ data.id + " with the event "+data.event, data.data);
        var otherUser = usersList.getUser(data.socketid);
        otherUser.emitData({id: socket.id, data: data.data}, data.event);
    });

    socket.on('disconnect', function() {
        logger.log("Event: Disconnect", socket.id);
        usersList.removeUser(socket.id);
        socket.broadcast.emit('userDisconnected', {id: socket.id});
    });
});

console.log("Version 0.6", 'Listening on http://'+host+':' + port , "\n");