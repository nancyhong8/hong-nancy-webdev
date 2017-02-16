(function() {
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController)
        .controller("newPageController", newPageController)
        .controller("editPageController", editPageController);


    function pageListController($location, $routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams["wid"];
        var userId = $routeParams["uid"];
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.newPage = newPage;
        vm.websites = websites;
        vm.profile = profile;
        vm.widget = widget;
        vm.editPage = editPage;

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(websiteId);
        }

        init();

        function newPage() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/new");
        }

        function websites() {
            $location.url("/user/" + userId + "/website/");
        }

        function profile() {
            $location.url("/user/" + userId);
        }

        function widget(pageId) {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }

        function editPage(pageId) {
            var page = PageService.findPageById(pageId);
            vm.page = page;
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId);
        }
    }

    function newPageController($location, $routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams["wid"];
        var userId = $routeParams["uid"];
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pages = pages;
        vm.page = {name: "", title: ""};
        vm.createPage = createPage;
        vm.profile = profile;
        vm.websiteList = websiteList;
        vm.widget = widget;
        vm.editPage = editPage;
        function init() {
            vm.page = PageService.findPageById();
            vm.pages = PageService.findPagesByWebsiteId(websiteId);
        }
        init();

        function pages() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }

        function createPage() {
            page = PageService.createPage(websiteId, vm.page);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function websiteList() {
            $location.url("/user/" + userId + "/website/");
        }

        function widget(pageId) {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }

        function editPage(pageId) {
            var page = PageService.findPageById(pageId);
            vm.page = page;
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId);
        }

    }

    function editPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.pages = pages;
        var pageId = $routeParams["pid"];
        vm.pageId = pageId;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        vm.profile = profile;
        vm.page = {name: "", title: ""};
        vm.websiteList = websiteList;
        vm.widget = widget;
        vm.newPage = newPage

        function init() {
            vm.page = PageService.findPageById(pageId);
            vm.pages = PageService.findPagesByWebsiteId(websiteId);
        }
        init();

        function updatePage(page) {
            page = PageService.updatePage(pageId, vm.page);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }

        function deletePage() {
            page = PageService.deletePage(pageId);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }

        function pages() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }

        function profile() {
            $location.url("/user/" + userId);
        }
        function websiteList() {
            $location.url("/user/" + userId + "/website/");
        }

        function widget(pageId) {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }

        function newPage() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/new");
        }
    }


})();