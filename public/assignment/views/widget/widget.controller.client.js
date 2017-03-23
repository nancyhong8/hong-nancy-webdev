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
        vm.oldIndex = "";
        vm.newIndex = "";
        console.log("newIndex: " + vm.newIndex);
        console.log("oldINdex: " + vm.oldIndex);


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
            console.log("widgetId from edit in edit controller:" + widgetId);
            var promise = WidgetService.findWidgetById(widgetId);
            promise
                .then(function(widget) {
                    console.log(widget);
                    var type = widget.data.type;
                    if(type == 'HTML') {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/html");
                    }
                    if(type == 'YOUTUBE') {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/youtube");
                    }
                    if(type == 'IMAGE') {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/image");
                    }
                    if(type == 'HEADER') {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/header");
                    }
                    if(type == 'TEXT') {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/text");
                    }
                })
        }
    }

    function newWidgetController($routeParams, $location) {
        var vm = this;
        var widgetId = $routeParams["wgid"];

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];

        vm.profile = function() {
            $location.url("/user/" + userId);
        }
        vm.widgetsList = function() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
        }
        vm.headerPage = function() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/header");
        }
        vm.imagePage = function() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/image");
        }
        vm.youtubePage = function() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/youtube");
        }
        vm.htmlPage = function() {
            console.log("htmlPage from new widget controller");
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/html");
        }
        vm.inputPage = function() {
            console.log("inputPage from new widget controller");
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/input");
        }

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
            console.log("widgetId: " + widgetId);
            if (widgetId == "header") {
                console.log("reached header");
                vm.widget = {'type': 'HEADER'};
            }
            else if (widgetId == "image") {
                vm.widget = {"type": "IMAGE"};
            }
            else if (widgetId == "youtube") {
                vm.widget = {"type": "YOUTUBE"};
            }
            else if (widgetId == "html") {
                console.log("init edit controller vierified it is html type")
                vm.widget = {"type": "HTML"};
            }
            else if (widgetId == "input") {
                console.log("init edit controller vierified it is input type")
                vm.widget = {"type": "INPUT"};
            }
            else {
                console.log("reached edit init");
                var promise = WidgetService.findWidgetById(widgetId);
                promise
                    .then(function(widget) {
                        vm.widget = widget.data;
                    }),(function(error) {
                    alert("error");
                })
            }
        }
        init();

        function updateWidget(widget) {
            console.log("updateWidget controller ");
            console.log(pageId);
            vm.widget._page = pageId;
            console.log(vm.widget);
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