module.exports = function(app) {
    require("./server/user.service.server.js")(app);
    require("./server/website.service.server.js")(app);
    require("./server/page.service.server.js")(app);
    require("./server/widget.service.server.js")(app);
}