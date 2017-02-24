(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        // var websites = [
        //     {"_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        //     {"_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        //     {"_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        //     {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        //     {"_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        //     {"_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        // ];
        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "findWebsitesByUser": findWebsitesByUser,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website", website);
            // var newWebsite = {_id: "345", name: website.name, developerId: userId, description: website.description}
            // websites.push(newWebsite);
            // return newWebsite;
        }

        function findWebsiteById(websiteId) {
            return $http.get("/api/website/"+websiteId);
            // for(var w in websites) {
            //     if( websites[w]._id == websiteId) {
            //         return websites[w];
            //     }
            // }
        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
            // var nWebsites = [];
            // for(var w in websites) {
            //     if( websites[w].developerId === userId) {
            //         nWebsites.push(websites[w]);
            //     }
            // }
            // return nWebsites;
        }


        function updateWebsite(websiteId, website) {
            return $http.put("/api/website/"+websiteId, website);
            // for(var w in websites) {
            //     if(websites[w]._id == websiteId) {
            //         websites[w] = website;
            //     }
            // }
            // return null;
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
            // for(i=0; i<websites.length; i++) {
            //     if(websites[i]._id == websiteId) {
            //         websites.splice(i, 1);
            //     }
            // }
            // return null;
        }


    }
})();