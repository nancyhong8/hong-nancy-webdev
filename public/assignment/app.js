/**
 * Created by Nancy Hong on 10-Feb-17.
 */
(function () {
    angular
        .module("WebAppMaker", ["ngRoute"]);
})();


model.exports = function(app) {
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
}