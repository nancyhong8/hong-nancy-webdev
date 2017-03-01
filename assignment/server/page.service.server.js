module.exports = function (app) {

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findPagesByWebsiteId);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);



        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            {"_id": "543", "name": "Post 3", "websiteId": "567", "description": "Lorem" }
        ];



        function createPage(req, res) {
            var newPage = req.body;
            newPage._id = (new Date()).getTime();
            pages.push(newPage);
            res.json(newPage);
        }

        function findPagesByWebsiteId(req, res) {
            var websiteId = req.params['wid'];
            var nPages = [];
            for(var p in pages) {
                if(pages[p].websiteId == websiteId) {
                    nPages.push(pages[p]);
                }
            }
            res.send(pages);
        }

        function findPageById(req, res) {
            var pageId = req.params['pid'];
            for(var p in pages) {
                if( pages[p]._id == pageId) {
                    res.send(pages[p]);
                    return;
                }
            }
            res.sendStatus(404).send({});
        }


        function updatePage(req, res) {
            var pageId = req.params['pid'];
            for(var p in pages) {
                if(pages[p]._id == pageId) {
                    pages[p] = req.body;
                    res.sendStatus(200);
                    return;
                }
            }
            res.sendStatus(404);
        }

        function deletePage(req, res) {
            var pageId = req.params['pid'];
            for(i=0; i<pages.length; i++) {
                if(pages[i]._id == pageId) {
                    pages.splice(i, 1);
                    res.sendStatus(200);
                    return;
                }
            }
            res.sendStatus(404);
        }



}