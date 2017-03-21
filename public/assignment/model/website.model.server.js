

    var q = require('q');
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server.js')();
    var websiteModel = mongoose.model('webdevSPR17Websites', websiteSchema);
    var userModel = require('./user.model.server.js');
    var deferred = q.defer();





    function createWebsiteForUser(userId, website) {
        userModel.findUserById(userId)
            .then(function(user) {
                user.websites.push(website);
                websiteModel.create(website, function(err, website) {
                    deferred.resolve(website);
                });
                user.save(function(err, user) {
                });
            });

        return deferred.promise;
    }

    function findWebsitesByUser(userId) {
        websiteModel.findOne({'_user': userId}, function(err, website) {
            deferred.resolve(website);
            console.log('website from model findWebsiteByUser: ' + website);
        });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        websiteModel.findOne({'_id': websiteId}, function(err, website) {
            deferred.resolve(website);
            console.log('website from model findWebsiteById: ' + website);

        });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        websiteModel.update({'_id': websiteId}, {
            $set: {'_user': website._user},
            $set: {'name': website.name},
            $set: {'description': website.description},
            $set: {'dateCreated': website.dateCreated}
        }, function(err, website) {
            deferred.resolve(website);
        });
        return deferred.promise;
    }

    function deleteWebsite(websiteId) {
        websiteModel.findOne({'_id': websiteId}).remove(function(err) {
            if(err) {
                console.log(err);
            }
        });
        return deferred.promise;
    }

    websiteModel.createWebsiteForUser = createWebsiteForUser;
    websiteModel.findWebsitesByUser = findWebsitesByUser;
    websiteModel.findWebsiteById = findWebsitesByUser;
    websiteModel.updateWebsite = updateWebsite;
    websiteModel.deleteWebsite = deleteWebsite;

    module.exports = websiteModel;

