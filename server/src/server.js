var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
    console.log(socket.store);
    io.sockets.emit('user-connected', {  });

    socket.on('message', function () { });
    socket.on('disconnect', function () { });
});