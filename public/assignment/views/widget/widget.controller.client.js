(function() {
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController)
        .controller("newWidgetController", newWidgetController)
        .controller("editWidgetController", editWidgetController);

    function widgetListController($sce, $location, $routeParams, WidgetService) {
        var vm = this;
        var pageId = $routeParams["pid"];
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        vm.doYouTrustUrl = doYouTrustUrl;
        vm.edit = edit;
        vm.pageId = pageId;
        vm.pages = pages;
        vm.profile = profile;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(pageId);
        }
        init();

        function pages() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }
        function edit(widgetId) {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
        }
    }

    function newWidgetController() {
        var vm = this;
    }

    function editWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        var widgetId = $routeParams["wgid"];
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        vm.widgetId = widgetId;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.profile = profile;
        vm.widgetList = widgetList;


        function init() {
            vm.widget = WidgetService.findWidgetById(widgetId);
            console.log(widgetId);
            console.log(vm.widget);
            console.log(vm.widget._id);
            console.log(vm.widget.widgetType);
        }

        init();

        function updateWidget(widget) {
            widget = WidgetService.updateWidget(widgetId, vm.widget);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }

        function deleteWidget() {
            widget = WidgetService.deleteWidget(widgetId);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");

        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function widgetList() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
    }

})();