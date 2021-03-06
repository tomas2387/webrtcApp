define(["UserMedia", "VideoWrapper", "ConnectionWrapper", "ServerConnection", "Logger", "ListUsers"],
    function(UserMedia, VideoWrapper, ConnectionWrapper, ServerConnection, Logger, UsersList) {
        "use strict";

        var localVideoWrapper = new VideoWrapper(document.getElementById('localVideo'));
        var userLocalMedia = new UserMedia({video:true,audio:true}, localVideoWrapper);

        var remoteVideoWrapper = new VideoWrapper(document.getElementById('remoteVideo'));
        var userRemoteMedia = new UserMedia({video:true,audio:true}, remoteVideoWrapper);

        var logger = new Logger(document.getElementById('log'));
        var userList = new UsersList(document.getElementById('userlist'), logger);

        var server = new ServerConnection();
        var connection = new ConnectionWrapper(logger, server, userLocalMedia, userRemoteMedia);

        server.on('userList', userList.setUserList.bind(userList, connection.publishSDP, connection));
        server.on('userConnected', userList.addUserToUserList.bind(userList, connection.publishSDP, connection));
        server.on('userDisconnected', userList.removeUser.bind(userList));

        logger.log("Initiating version 0.7.5");

        var startButton = document.getElementById("startButton");
        startButton.onclick = startLocalVideo;

        function startLocalVideo() {
            startButton.innerHTML = "Parar video";
            startButton.onclick = stopLocalVideo;

            if (userLocalMedia.hasGetUserMedia()) {
                logger.log('Initiating local streaming...');
                userLocalMedia.localQueryCamera();
            } else {
                logger.log('getUserMedia is not compatible in your browser');
                stopLocalVideo();
            }
        }

        function stopLocalVideo() {
            logger.log('Video stopped');
            startButton.innerHTML = "Start";
            startButton.onclick = startLocalVideo;
            userLocalMedia.stopMedia();
        }
        //
        //document.getElementById('disconnect').onclick = function() {
        //    server.disconnect();
        //};
    });
