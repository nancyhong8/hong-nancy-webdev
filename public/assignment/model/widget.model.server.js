

var q = require('q');
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server.js')();
var widgetModel = mongoose.model('webdevSPR17Widgets', widgetSchema);
var pageModel = require('./page.model.server.js');
var deferred = q.defer();





function createWidget(pageId, widget) {
    pageModel.findPageById(pageId)
        .then(function(page) {
            page.widgets.push(widget);
            pageModel.create(widget, function(err, widget) {
                deferred.resolve(widget);
            });
            page.save(function(err, page) {
            });
        });

    return deferred.promise;
}

function findAllWidgetsForPage(pageId) {
    widgetModel.findOne({'_page': pageId}, function(err, widget) {
        deferred.resolve(widget);
        console.log('widget from model findWebsiteByUser: ' + widget);
    });
    return deferred.promise;
}

function findWidgetById(widgetId) {
    widgetModel.findOne({'_id': widgetId}, function(err, widget) {
        deferred.resolve(widget);
        console.log('widget from model findWebsiteById: ' + widget);

    });
    return deferred.promise;
}

function updateWidget(widgetId, widget) {
    widgetModel.update({'_id': widgetId}, {
        $set: {'_page': widget._page},
        $set: {'type': widget.type},
        $set: {'name': widget.name},
        $set: {'text': widget.text},
        $set: {'placeholder': widget.placeholder},
        $set: {'description': widget.description},
        $set: {'url': widget.url},
        $set: {'width': widget.width},
        $set: {'height': widget.height},
        $set: {'rows': widget.rows},
        $set: {'size': widget.size},
        $set: {'class': widget.class},
        $set: {'icon': widget.icon},
        $set: {'deletable': widget.deletable},
        $set: {'formatted': widget.formatted},
        $set: {'dateCreated': widget.dateCreated}
    }, function(err, widget) {
        deferred.resolve(widget);
    });
    return deferred.promise;
}

function deleteWidget(widgetId) {
    widgetModel.findOne({'_id': widgetId}).remove(function(err) {
        if(err) {
            console.log(err);
        }
    });
    return deferred.promise;
}

function reorderWidget(pageId, start, end) {
    

}

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidge = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

