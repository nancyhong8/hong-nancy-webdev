module.exports = function (app) {

    console.log('user service server');

    app.post("/api/user", createUser);
    // app.get("/api/user?username=username", findUserByUsername());
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);


        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: "alice@wonderland.com"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@marley.com"},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charly@charly.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@annunzi.com "}
        ];


        function createUser(req, res) {
            console.log("reached createUser");
            var newUser = req.body;
            newUser._id = (new Date()).getTime();
            users.push(newUser);
            console.log(newUser);
            res.send(newUser);
        }

        function findUserById(req, res) {
            var userId = req.params['uid'];
            for(var u in users) {
                if( users[u]._id == userId) {
                    res.send(users[u]);
                    return;
                }
            }
            res.sendStatus(404);
        }

        // function findUserByUsername(req, res) {
        //     // // var username = req.query['username'];
        //     // for(var u in users) {
        //     //     if( users[u].username == username) {
        //     //         res.send(users[u]);
        //     //         return;
        //     //     }
        //     // }
        //     // res.sendStatus(404);
        // }

        function findUserByCredentials(req, res) {
            console.log("inside user cred");
            var username = req.query.username;
            var password = req.query.password;
            for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    console.log("reached before send");
                    res.send(users[u]);
                    return;
                }
            }
            res.sendStatus(404);
        }

        function updateUser(req, res) {
            var userId = req.params['uid'];
            for(var u in users) {
                if(users[u]._id == userId) {
                    users[u] = req.body;
                    res.sendStatus(200);
                    return;
                }
            }
            res.sendStatus(404);

        }

        function deleteUser(req, res) {
            var userId = req.params['uid'];
            for(i=0; i<users.length; i++) {
                if(users[i]._id == userId) {
                    users.splice(i, 1);
                    res.sendStatus(200);
                    return;
                }
            }
            res.sendStatus(404);
        }


};