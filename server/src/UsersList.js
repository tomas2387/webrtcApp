var UsersList = function() {
    "use strict";
    this.list = [];
    this.listIds = [];
};

UsersList.prototype.addUser = function(id, user) {
    "use strict";
    this.list[id] = user;
    this.listIds.push(id);
    console.log("AddUser: User added with id "+id+ "added.");
    var len = this.listIds.length;
    console.log("AddUser: Users connected: "+len);
};

UsersList.prototype.removeUser = function(id) {
    "use strict";
    console.log("RemoveUser: User "+id);
    var index = this.listIds.indexOf(id);
    this.listIds.splice(index, 1);
    delete this.list[id];
    var len = this.listIds.length;
    console.log("AddUser: Users connected: "+len);
};

UsersList.prototype.getUser = function(socketid) {
    "use strict";
    return this.list[socketid];
};

UsersList.prototype.getAllUsers = function() {
    "use strict";
    var result = [];
    var len = this.listIds.length;
    console.log("getAllUsers: Users connected: "+len);
    for(var i = 0; i < len; ++i) {
        var id = this.listIds[i];
        var oneUser = this.list[id];
        result.push({id: id, name: oneUser.getUserName()});
    }
    return result;
};

module.exports = UsersList;
