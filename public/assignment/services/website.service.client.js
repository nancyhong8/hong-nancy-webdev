(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", websiteService);

    function websiteService() {
        var websites = [
            {_id: "123", name: "Facebook",    "developerId": "456", "description": "Lorem" },
            {_id: "234", name: "Tweeter",     "developerId": "456", "description": "Lorem" },
            {_id: "456", name: "Gizmodo",     "developerId": "456", "description": "Lorem" },
            {_id: "567", name: "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            {_id: "678", name: "Checkers",    "developerId": "123", "description": "Lorem" },
            {_id: "789", name: "Chess",       "developerId": "234", "description": "Lorem" },
        ];
        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            // var newUser = {_id: user._id, username: user.username, password: use
            users.push(user);
            return null
        }

        function findUserById(userId) {
            for(var u in users) {
                if( users[u]._id == userId) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var u in users) {
                if( users[u].username == username) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    return users[u];
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for(var u in users) {
                if(users[u]._id == userId) {
                    users[u] = user;
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for(i=0; i<users.length; i++) {
                if(users[i]._id == userId) {
                    users.splice(i, 1);
                }
            }
            return null;
        }


    }
})();