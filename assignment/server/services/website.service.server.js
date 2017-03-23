module.exports = function (app) {

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findWebsitesByUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);


        // var websites = [
        //     {"_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        //     {"_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        //     {"_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        //     {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        //     {"_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        //     {"_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        // ];

    var websiteModel = require('../model/website.model.server.js');


        function createWebsite(req, res) {
            var userId = req.params['uid'];
            var newWebsite = req.body;
            newWebsite._userId = userId;
            console.log('website from server create');
            console.log(newWebsite);
            websiteModel.createWebsiteForUser(userId, newWebsite)
                .then(function(website) {
                    console.log('sending website from server:');
                    console.log(website);
                    res.send(website);
                }),function(err) {
                console.log(err);
            }
        }

        function findWebsiteById(req, res) {
            var websiteId = req.params['wid'];
            console.log('findWebsiteById in service server');
            console.log(websiteId);
            websiteModel.findWebsiteById(websiteId)
                .then(function(website) {
                    console.log('findWebsiteById website from server:');
                    console.log(website);
                    res.send(website);
                }),function(err) {
                console.log(err);
            }
        }

        function findWebsitesByUser(req, res) {
            var userId = req.params['uid'];
            websiteModel.findWebsitesByUser(userId)
                .then(function(website) {
                    console.log('sending website from server:' + website);
                    res.send(website);
                }),function(err) {
                console.log(err);
            }
        }


        function updateWebsite(req, res) {
            var websiteId = req.params['wid'];
            var website = req.body;
            websiteModel.updateWebsite(websiteId, website)
                .then(function(website) {
                    console.log('sending website from server:' + website);
                    res.sendStatus(200);
                }),function(err) {
                console.log(err);
            }
        }

        function deleteWebsite(req, res) {
            var websiteId = req.params['wid'];
            websiteModel.deleteWebsite(websiteId)
                .then(function(website) {
                    console.log("deleteWebiste from service server");
                    res.sendStatus(200);
                }),function(err) {
                console.log(err);
            }
        }



}