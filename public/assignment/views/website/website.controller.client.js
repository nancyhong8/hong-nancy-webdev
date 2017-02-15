(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController)
        .controller("newWebsiteController", newWebsiteController)
        .controller("editWebsiteController", editWebsiteController);

    function websiteListController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams["uid"];
        var websites = WebsiteService.findWebsitesByUser(userId);
        vm.websites = websites;
        vm.userId = userId;
        vm.newWebsite = newWebsite;
        vm.profile = profile;
        vm.edit = edit;
        vm.website = {name: "", description: ""};
        vm.page = page;


        function page(websiteId) {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }

        function newWebsite() {
            $location.url("/user/" + userId + "/website/new")
        }

        function profile() {
            $location.url("/user/" + userId);
        }

        function edit(websiteId) {
            //website = WebsiteService.updateWebsite(userId, vm.website);
            var website = WebsiteService.findWebsiteById(websiteId);
            vm.website = website;
            $location.url("/user/" + userId + "/website/" + websiteId);
        }


    }

    function newWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.website = {name: "", descrription: ""};
        vm.create = create;
        vm.profile = profile;
        vm.websites = websites;

        function websites() {
            $location.url("/user/" + userId + "/website");
        }

        function create() {
            website = WebsiteService.createWebsite(userId, vm.website);
            $location.url("/user/" + userId + "/website");
        }

        function profile() {
            $location.url("/user/" + userId);
        }

    }

    function editWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        vm.websiteId = websiteId;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.profile = profile;
        vm.website = {name: "", description: ""};
        vm.websites = websites;

        function init() {
            var website = WebsiteService.findWebsiteById(websiteId);
            vm.website = website;
        }
        init();

        function websites() {
            $location.url("/user/" + userId + "/website");
        }

        function profile() {
            $location.url("/user/" + userId);
        }
        function updateWebsite() {
            website = WebsiteService.updateWebsite(websiteId, vm.website);
            $location.url("/user/" + userId + "/website");
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(websiteId);
            $location.url("/user/" + userId + "/website");
        }
    }

})();