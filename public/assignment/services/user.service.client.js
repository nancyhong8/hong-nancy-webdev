(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: "alice@wonderland.com"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@marley.com"},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charly@charly.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@annunzi.com "}
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
            var newUser = {_id: 678, username: user.username, password: user.password, firstName: "", lastName: "", email: ""}
            users.push(newUser);
            return newUser;
        }

        function findUserById(userId) {
            for(var u in users) {
                if( users[u]._id == userId) {
                    return users[u];
                }
            }
            //return null;
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