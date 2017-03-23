

var q = require('q');
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server.js')();
var widgetModel = mongoose.model('webdevSPR17Widgets', widgetSchema);
var pageModel = require('./page.model.server.js');


function createWidget(pageId, widget) {
    var deferred = q.defer();
    console.log('createWidget before creating');
    console.log(widget);

    widgetModel.findById(widget, function(err, returnedWidget) {
        if(err) {
            widgetModel.create(widget, function(err, newWidget) {
                if(newWidget) {
                    console.log("createWidget from model");
                    console.log(newWidget);
                    deferred.resolve(newWidget);
                    pageModel.findByIdAndUpdate(pageId,
                        {$push: {"widgets": {_id: newWidget._id}}},
                        {safe: true, upsert: true, new : true},
                        function(err, result) {
                            console.log(err);
                        });
                }
                else {
                    console.log("error: " + err);
                }

            });
        }
        else if(returnedWidget) {
            console.log('createWidget udpate model');
            console.log(widget);
            console.log(returnedWidget._id);
            updateWidget(returnedWidget._id, widget);
        }
    })

    return deferred.promise;
}

function findAllWidgetsForPage(pageId) {
    var deferred = q.defer();

    widgetModel.find({_page: pageId}, function(err, widget) {
        deferred.resolve(widget);
        console.log('widget from model findWebsiteByUser: ' + widget);
    });
    return deferred.promise;
}



function findWidgetById(widgetId) {
    var deferred = q.defer();

    widgetModel.findById(widgetId, function(err, widget) {
        deferred.resolve(widget);
        console.log('widget from model findWebsiteById: ' + widget);
    });
    return deferred.promise;
}

// TODO perhaps return the widget and have create defer it
function updateWidget(widgetId, widget) {
    console.log("update Widget model");
    console.log(widgetId);
    console.log(widget);

    var deferred = q.defer();

    if(widget.type == 'HEADER') {
        widgetModel.update({'_id': widgetId}, {$set: {
            'name': widget.name,
            'text': widget.text,
            'size': widget.size
        }}, function(err, widget) {
            console.log("after update header");
            console.log(widget);
            console.log(err)
            deferred.resolve(widget);
        })
    }

    else if(widget.type == 'IMAGE') {
        widgetModel.update({'_id': widgetId}, {$set: {
            'name': widget.name,
            'text': widget.text,
            'url': widget.url,
            'width': widget.width
        }}, function(err, widget) {
            console.log("after update");
            console.log(widget);
            console.log(err)
            deferred.resolve(widget);
        });
    }
    else if(widget.type == 'YOUTUBE') {
        widgetModel.update({'_id': widgetId}, {$set: {
            'name': widget.name,
            'text': widget.text,
            'url': widget.url,
            'width': widget.width,
        }}, function(err, widget) {
            console.log("after update");
            console.log(widget);
            console.log(err)
            deferred.resolve(widget);
        });
    }
    else if(widget.type == 'HTML') {
        widgetModel.update({'_id': widgetId}, {$set: {

        }}, function(err, widget) {
            deferred.resolve(widget);
        });
    }
    console.log("reaching return");
    return deferred.promise;
}

function deleteWidget(widgetId) {
    var deferred = q.defer();

    widgetModel.findByIdAndRemove(widgetId, function(err, widget) {
        pageId = widget._page;
        pageModel.findPageById(pageId)
            .then(function (page) {
                page.widgets.splice(page.widgets.indexOf(widgetId), 1);
                page.save(function (response) {
                    deferred.resolve(response);
                });
            });
    });

    return deferred.promise;
}

function reorderWidget(pageId, start, end) {
    

}

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

