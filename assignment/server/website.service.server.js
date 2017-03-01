module.exports = function (app) {

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findWebsitesByUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);


        var websites = [
            {"_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            {"_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            {"_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            {"_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            {"_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];



        function createWebsite(req, res) {
            var userId = req.params['uid'];
            var newWebsite = req.query['website'];
            newWebsite._id = (new Date()).getTime();
            newWebsite.developerId = userId;
            websites.push(newWebsite);
            res.json(newWebsite);
        }

        function findWebsiteById(req, res) {
            var websiteId = req.params['wid'];
            for(var w in websites) {
                if( websites[w]._id == websiteId) {
                    res.send(websites[w]);
                    return;
                }
            }
            res.sendStatus(404);
        }

        function findWebsitesByUser(req, res) {
            var userId = req.params['uid'];
            var nWebsites = [];
            for(var w in websites) {
                if( websites[w].developerId === userId) {
                    nWebsites.push(websites[w]);
                }
            }
            res.send(nWebsites);
        }


        function updateWebsite(req, res) {
            var websiteId = req.params['wid'];
            for(var w in websites) {
                if(websites[w]._id == websiteId) {
                    websites[w] = req.body;
                    res.sendStatus(200);
                    return;
                }
            }
            res.sendStatus(404);
        }

        function deleteWebsite(req, res) {
            var websiteId = req.params['wid'];
            for(i=0; i<websites.length; i++) {
                if(websites[i]._id == websiteId) {
                    websites.splice(i, 1);
                    res.sendStatus(200);
                    return;
                }
            }
            res.sendStatus(404);
        }



}