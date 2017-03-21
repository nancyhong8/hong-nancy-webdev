
// module.exports = function() {
    var q = require('q');
    var mongoose = require('mongoose');

    var userSchema = require('./user.schema.server.js')();
    var userModel = mongoose.model('webdevSPR17Users', userSchema);
    var deferred = q.defer();

    // var api = {
    //     "createUser": createUser,
    //     "findUserById": findUserById,
    //     "findUserByUsername": findUserByUsername,
    //     "findUserByCredentials": findUserByCredentials,
    //     "updateUser": updateUser,
    //     "deleteUser": deleteUser
    // };
    // return api;

    function createUser(user) {

        userModel.create({'username': user.username, 'password': user.password}, function(err, user) {
            if(user) {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        userModel.findOne({'_id': userId}, function(err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
}

    function findUserByUsername(username) {
        userModel.findOne({'username': username}, function(err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        userModel.findOne({'username': username, 'password': password}, function(err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        userModel.update({'_id': userId}, {
            $set: {'username': user.username},
            $set: {'email': user.email},
            $set: {'firstName': user.firstName},
            $set: {'lastName': user.lastName}
        }, function(err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        userModel.findOne({'_id': userId}).remove(function(err) {
            if(err) {
                console.log(err);
            }

        })
        return deferred.promise;
    }

// return userModel;
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;


module.exports = userModel;

// return userModel;

