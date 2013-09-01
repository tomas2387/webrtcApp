window.define(function() {
    "use strict";

    var ListUsers = function(logListElement, logger) {
        this.ListUsers = logListElement;
        this.logger = logger;
    };

    ListUsers.prototype.setUserList = function(startCall, self, userList) {
        userList = userList.list;
        var len = userList.length;
        for(var i = 0; i < len; i++) {
            var user = userList[i];
            this.addUserToUserList(startCall, self, user);
        }
        if(len === 0) this.logger.log("No users connected");
    };

    ListUsers.prototype.addUserToUserList = function(startCall, self, data) {
        this.logger.log("User connected " + data.id);
        var elementDiv = document.createElement("div");
        elementDiv.id = data.id;
        var buttonCall = document.createElement("button");
        buttonCall.innerHTML = "Call " + data.id;
        buttonCall.className = "actions";
        buttonCall.onclick = startCall.bind(self, data.id);
        elementDiv.appendChild(buttonCall);
        var usernameElement = document.createElement("div");
        usernameElement.innerHTML = data.name;
        usernameElement.className = "truncate";
        elementDiv.appendChild(usernameElement);
        this.ListUsers.appendChild(elementDiv);
    };

    ListUsers.prototype.removeUser = function(data) {
        var userElement = document.getElementById(data.id);
        this.ListUsers.removeChild(userElement);
        this.logger.log("User disconnected " + data.id);
    };

    return ListUsers;
});
