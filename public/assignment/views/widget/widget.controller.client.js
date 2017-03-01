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
            var promise = WidgetService.findWidgetsByPageId(pageId);
            promise
                .then(function(widget) {
                    vm.widgets = widget.data;
                }),(function(error) {
                    alert("error");
                })
        }
        init();

        vm.newWidget = function() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/new");
        }

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
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.profile = profile;
        vm.widgetList = widgetList;


        function init() {
            var promise = WidgetService.findWidgetById(widgetId);
            promise
                .then(function(widget) {
                    vm.widget = widget.data;
                }),(function(error) {
                    alert("error");
                })
        }
        init();

        function updateWidget(widget) {
            var promise = WidgetService.updateWidget(widgetId, vm.widget);
            promise
                .then(function(widget) {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                }),(function(error) {
                    alert("error");
                })

        }

        function deleteWidget() {
            var promise = WidgetService.deleteWidget(widgetId);
            promise
                .then(function(widget) {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                }),(function(error) {
                    alert("error");
                })

        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function widgetList() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
    }

})();