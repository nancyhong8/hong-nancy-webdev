module.exports = function (app) {

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.put("/page/:pid/widget?initial=index1&final=index2");
    app.put("/page/:pid/widget?start=index1&end=index2", reorderWidget);

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    var widgetModel = require('../model/widget.model.server.js');


    function uploadImage(req, res) {
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var url = '/assignment/#!\/user\/'+userId+'\/website\/'+websiteId+'\/page\/'+pageId+'\/widget\/';
        var widget = {"_id": widgetId, "widgetType": "IMAGE", "pageId": pageId, "width": width, "url": "/uploads/" + filename};
        widgets.push(widget);
        res.redirect(url);
    }

        // var widgets = [
        //     {"_id": "123", "widgetType": "HEADER", "pageId": "543", "size": 2, "text": "GIZMODO" },
        //     {"_id": "234", "widgetType": "HEADER", "pageId": "543", "size": 4, "text": "Lorem ipsum" },
        //     {"_id": "345", "widgetType": "IMAGE", "pageId": "543", "width": "100%", "url": "http://lorempixel.com/400/200" },
        //     {"_id": "456", "widgetType": "HTML", "pageId": "543", "text": "<p>Lorem ipsum</p>" },
        //     {"_id": "567", "widgetType": "HEADER", "pageId": "543", "size": 4, "text": "Lorem ipsum" },
        //     {"_id": "678", "widgetType": "YOUTUBE", "pageId": "543", "width": "100%", "url": "http://youtube/AM2Ivdi9c4E" },
        //     {"_id": "789", "widgetType": "HTML", "pageId": "543", "text": "<p>Lorem ipsum</p>" }
        // ];



        function createWidget(req, res) {
            var pageId = req.params['pid'];
            var widget = req.body;
            widget._page = pageId;
            widgetModel.createWidget(pageId, widget)
                .then(function(widget) {
                    console.log('sending website from server:' + widget);
                    res.send(widget);
                }),function(err) {
                console.log(err);
            }
        }

        function findWidgetsByPageId(req, res) {
            var pageId = req.params['pid'];
            widgetModel.findAllWidgetsForPage(pageId)
                .then(function(widget) {
                    console.log('sending website from server:' + widget);
                    res.send(widget);
                }),function(err) {
                console.log(err);
            }
        }

        function findWidgetById(req, res) {
            var widgetId = req.params['wgid'];
            widgetModel.findWidgetById(widgetId)
                .then(function(widget) {
                    console.log('sending website from server:' + widget);
                    res.send(widget);
                }),function(err) {
                console.log(err);
            }
        }


        function updateWidget(req, res) {
            var widgetId = req.params['wgid'];
            var pageId = req.params['pid'];
            var widget = req.body;
            console.log("updatewidget from server");
            console.log(widget);
            widgetModel.createWidget(pageId, widget)
                .then(function(widget) {
                    console.log('sending website from server:' + widget);
                    res.sendStatus(200);
                }),function(err) {
                res.sendStatus(404);
                console.log(err);
            }
        }

        function deleteWidget(req, res) {
            var widgetId = req.params['wgid'];
            widgetModel.deleteWidget(widgetId)
                .then(function(widget) {
                    console.log('sending website from server:' + widget);
                    res.sendStatus(200);
                }),function(err) {
                console.log(err);
                res.sendStatus(404);
            }
        }

        function reorderWidget(req, res) {
            // var pageId = req.params['pid'];
            // var start = req.query['start'];
            // var end = req.query['end'];
            // widgetModel.reorderWidget(pageId, start, end)
            //     .then(function(widget) {
            //         res.sendStatus(200);
            //     }),function(err) {
            //     console.log(err);
            //     res.sendStatus(404);
            // }
        }


}