(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);

    function widgetService() {

        var widgets = [
            {"_id": "123", "widgetType": "HEADER", "pageId": "543", "size": 2, "text": "GIZMODO" },
            {"_id": "234", "widgetType": "HEADER", "pageId": "543", "size": 4, "text": "Lorem ipsum" },
            {"_id": "345", "widgetType": "IMAGE", "pageId": "543", "width": "100%", "url": "http:lorempixel.com/400/200" },
            {"_id": "456", "widgetType": "HTML", "pageId": "543", "text": "<p>Lorem ipsum</p>" },
            {"_id": "567", "widgetType": "HEADER", "pageId": "543", "size": 4, "text": "Lorem ipsum" },
            {"_id": "678", "widgetType": "YOUTUBE", "pageId": "543", "width": "100%", "url": "http://youtube/AM2Ivdi9c4E" },
            {"_id": "789", "widgetType": "HTML", "pageId": "543", "text": "<p>Lorem ipsum</p>" }
        ];

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
            return null
        }

        function findWidgetsByPageId(pageId) {
            var nPages = [];
            for(var w in widgets) {
                if(widgets[w].pageId == pageId) {
                    nPages.push(widgets[w]);
                }
            }
            return nPages;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    return widgets[w];
                }
            }
            return null;
        }


        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    widgets[w] = widget;
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for(i=0; i<widgets.length; i++) {
                if(widgets[i]._id == widgetId) {
                    widgets.splice(i, 1);
                }
            }
            return null;
        }


    }
})();