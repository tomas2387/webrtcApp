var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
    io.sockets.emit('user-connected', { id: socket.id });

    socket.on('publishSDP', function() {
        console.log(arguments);
    });

    socket.on('disconnect', function (socket) {
        console.log("Disconnected");
    });
});