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

        function init() {
            var userId = $routeParams['uid'];
            var promise = WebsiteService.findWebsitesByUser(userId);
            promise
                .then(function(websites) {
                    vm.websites = websites.data;
                }),function(err) {
                alert(err);
            }
        }
        init();

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
            var promise = WebsiteService.findWebsiteById(websiteId);
            promise
                .then(function(website) {
                    vm.website = website.data;
                    $location.url("/user/" + userId + "/website/" + websiteId);
                }),(function(error) {
                    alert("error");
                })
        }


    }

    function newWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams["uid"];
        //var websiteId = $routeParams["wid"];
        vm.website = {name: "", descrription: ""};
        vm.create = create;
        vm.profile = profile;
        vm.websiteList = websiteList;
        vm.edit = edit;
        vm.page = page;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(userId);
            promise
                .then(function(website) {
                    vm.websites = website.data;
                }),(function(error) {
                    alert("error");
                })
        }
        init();

        function websiteList() {
            $location.url("/user/" + userId + "/website");
        }

        function create() {
            var promise = WebsiteService.createWebsite(userId, vm.website);
            promise
                .then(function(website) {
                    $location.url("/user/" + userId + "/website");
                }),(function(error) {
                    alert("error");
                })
        }

        function profile() {
            $location.url("/user/" + userId);
        }

        function edit(websiteId) {
            $location.url("/user/" + userId + "/website/" + websiteId);
        }
        function page(websiteId) {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
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
        vm.websiteList = websiteList;
        vm.edit = edit;
        vm.page = page;
        vm.newWebsite = newWebsite;

        function init() {
            var promise = WebsiteService.findWebsiteById(websiteId);
            var promise2 = WebsiteService.findWebsitesByUser(userId);
            promise
                .then(function(website) {
                    vm.website = website.data;
                }),(function(error) {
                    alert("error");
                })
            promise2
                .then(function(website) {
                    vm.websites = website.data;
                }),(function(error) {
                    alert("error");
                })
        }
        init();

        function websiteList() {
            $location.url("/user/" + userId + "/website");
        }

        function profile() {
            $location.url("/user/" + userId);
        }
        function updateWebsite() {
            var promise = WebsiteService.updateWebsite(websiteId, vm.website);
            promise
                .then(function(website) {
                    $location.url("/user/" + userId + "/website");
                }),(function(error) {
                    alert("error");
                })
        }

        function deleteWebsite() {
            var promise = WebsiteService.deleteWebsite(websiteId);
            promise
                .then(function(website) {
                    $location.url("/user/" + userId + "/website");
                }),(function(error) {
                    alert("error");
                })
        }

        function edit(websiteId) {
            $location.url("/user/" + userId + "/website/" + websiteId);
        }
        function page(websiteId) {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }
        function newWebsite() {
            $location.url("/user/" + userId + "/website/new")
        }
    }

})();