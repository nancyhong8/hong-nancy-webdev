module.exports = function (app) {

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.put("/page/:pid/widget?initial=index1&final=index2");

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/upload", upload.single('myFile'), uploadImage);

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

        var widgets = [
            {"_id": "123", "widgetType": "HEADER", "pageId": "543", "size": 2, "text": "GIZMODO" },
            {"_id": "234", "widgetType": "HEADER", "pageId": "543", "size": 4, "text": "Lorem ipsum" },
            {"_id": "345", "widgetType": "IMAGE", "pageId": "543", "width": "100%", "url": "http://lorempixel.com/400/200" },
            {"_id": "456", "widgetType": "HTML", "pageId": "543", "text": "<p>Lorem ipsum</p>" },
            {"_id": "567", "widgetType": "HEADER", "pageId": "543", "size": 4, "text": "Lorem ipsum" },
            {"_id": "678", "widgetType": "YOUTUBE", "pageId": "543", "width": "100%", "url": "http://youtube/AM2Ivdi9c4E" },
            {"_id": "789", "widgetType": "HTML", "pageId": "543", "text": "<p>Lorem ipsum</p>" }
        ];



        function createWidget(req, res) {
            var pageId = req.params['pid'];
            var widget = req.body;
            widget._id = (new Date()).getTIme();
            widget.pageId = pageId;
            widgets.push(widget);
            console.log("widget: " + widget);
            res.send(widget);
        }

        function findWidgetsByPageId(req, res) {
            console.log("reached findWidgetbyPageId");
            var pageId = req.params['pid'];
            var nWidgets = [];
            for(var w in widgets) {
                if(widgets[w].pageId == pageId) {
                    nWidgets.push(widgets[w]);
                }
            }
            console.log("widget: " + nWidgets);

            res.send(nWidgets);
        }

        function findWidgetById(req, res) {
            var widgetId = req.params['wgid'];
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    res.send(widgets[w]);
                    return;
                }
            }
            res.sendStatus(404);
        }


        function updateWidget(req, res) {
            var widgetId = req.params['wgid'];
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    widgets[w] = req.body;
                    res.sendStatus(200);
                    return;
                }
            }
            res.sendStatus(404);
        }

        function deleteWidget(req, res) {
            var widgetId = req.params['wgid'];
            for(i=0; i<widgets.length; i++) {
                if(widgets[i]._id == widgetId) {
                    widgets.splice(i, 1);
                    res.sendStatus(200);
                    return;
                }
            }
            res.sendStatus(400);
        }


}