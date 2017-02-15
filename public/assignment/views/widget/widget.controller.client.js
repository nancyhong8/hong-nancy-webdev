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

    function editWidgetController($routeParams, WidgetService) {
        var vm = this;
        vm.widgetId = $routeParams["widgetId"];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        init();

        function updateWidget(widget) {
            widget = WidgetService.updateWidget(vm.widgetId, widget);
        }

        function deleteWidget() {
            widget = WidgetService.deleteWidget(widget);
        }
    }

})();