var server  = require('http').createServer(),
    sio      = require('socket.io'),
    port    = 8081;

server.listen(port);

var io = sio.listen(server, { log:true });

var users = [];
var socketsids = [];

io.sockets.on('connection', function(socket){
    console.log('Client Connected');

    users[socket.id] = socket;
    socketsids.push(socket.id);

    socket.on('publishSDP', function(data) {
        console.log("Event: Publish SDP");
        console.log(data);

        if(users.length > 1) {

        }
    });
    socket.on('message', function(data) {
        console.log("Event: Message");

        socket.broadcast.emit('server_message',data);
        socket.emit('server_message',data);
    });
    socket.on('disconnect', function() {
        console.log("Event: Disconnect");
    });
});

console.log('Listening on http://0.0.0.0:' + port );
console.log("");
