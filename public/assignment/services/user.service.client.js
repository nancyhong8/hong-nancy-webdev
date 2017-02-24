(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        // var users = [
        //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: "alice@wonderland.com"  },
        //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@marley.com"},
        //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charly@charly.com"},
        //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@annunzi.com "}
        // ];
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
            return $http.post("/api/user", user);
            // var newUser = {_id: 678, username: user.username, password: user.password, firstName: "", lastName: "", email: ""}
            // users.push(newUser);
            // return newUser;
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
            // for(var u in users) {
            //     if( users[u]._id == userId) {
            //         return users[u];
            //     }
            // }
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
            // for(var u in users) {
            //     if( users[u].username == username) {
            //         return users[u];
            //     }
            // }
            // return null;
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
            // for(var u in users) {
            //     if( users[u].username == username &&
            //         users[u].password == password ) {
            //         return users[u];
            //     }
            // }
            // return null;
        }

        function updateUser(userId, user) {
            return $http.put("/api/user/"+userId, user);
            // for(var u in users) {
            //     if(users[u]._id == userId) {
            //         users[u] = user;
            //     }
            // }
            // return null;
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
            // for(i=0; i<users.length; i++) {
            //     if(users[i]._id == userId) {
            //         users.splice(i, 1);
            //     }
            // }
            // return null;
        }


    }
})();