var User = function(socket, SDP, ICE, username) {
    "use strict";
    this.userSocket = socket || null;
    this.userSDP = SDP || null;
    this.userICE = ICE || null;
    this.username = username || null;
};

User.prototype.setUserName = function(username) {
    "use strict";
    this.username = username;
};

User.prototype.setSDP = function(SDP) {
    "use strict";
    this.userSDP = SDP;
};

User.prototype.setICE = function(ICE) {
    "use strict";
    this.userICE = ICE;
};

User.prototype.getUserName = function() {
    "use strict";
    return this.username;
};

User.prototype.getSDP = function() {
    "use strict";
    return this.userSDP;
};

User.prototype.getICE = function() {
    "use strict";
    return this.userICE;
};

User.prototype.emitData = function(data, event) {
    "use strict";
    this.userSocket.emit(event, data);
};

module.exports = User;

