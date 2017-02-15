(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    function pageService() {

        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            {"_id": "543", "name": "Post 3", "websiteId": "567", "description": "Lorem" }
        ];

        var api = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page) {
            var newPage = {_id: "567", name: page.name, websiteId: websiteId, description: page.title};
            pages.push(newPage);
            return null
        }

        function findPagesByWebsiteId(websiteId) {
            var nPages = [];
            for(var p in pages) {
                if(pages[p].websiteId == websiteId) {
                    nPages.push(pages[p]);
                }
            }
            return nPages;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if( pages[p]._id == pageId) {
                    return pages[p];
                }
            }
            return null;
        }


        function updatePage(pageId, page) {
            for(var p in pages) {
                console.log(page);
                if(pages[p]._id == pageId) {
                    pages[p] = page;
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for(i=0; i<pages.length; i++) {
                if(pages[i]._id == pageId) {
                    pages.splice(i, 1);
                }
            }
            return null;
        }


    }
})();