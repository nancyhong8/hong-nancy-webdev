(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    function pageService($http) {

        var api = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page) {
            return $http.post("/api/website/"+website+"/page", page);

        }

        function findPagesByWebsiteId(websiteId) {
            return $http.get("/api/website/"+websiteId+"/page");

        }

        function findPageById(pageId) {
            return $http.get("/api/page/"+pageId);
        }


        function updatePage(pageId, page) {
            return $http.put("/api/page/"+pageId, page);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);
        }


    }
})();