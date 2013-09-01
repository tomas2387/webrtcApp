define(["UserMedia", "VideoWrapper", "ConnectionWrapper", "ServerConnection", "Logger", "ListUsers"],
    function(UserMedia, VideoWrapper, ConnectionWrapper, ServerConnection, Logger, UsersList) {
        "use strict";

        var localVideoWrapper = new VideoWrapper(document.getElementById('localVideo'));
        var userLocalMedia = new UserMedia(localVideoWrapper);

        var remoteVideoWrapper = new VideoWrapper(document.getElementById('remoteVideo'));
        var userRemoteMedia = new UserMedia(remoteVideoWrapper);

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
            startButton.innerHTML = "Stop";
            startButton.onclick = stopLocalVideo;

            if (userLocalMedia.hasGetUserMedia()) {
                logger.log('Asking the user if its ok to use the camera');
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

        document.getElementById('disconnect').onclick = function() {
            server.disconnect();
        };
    });
