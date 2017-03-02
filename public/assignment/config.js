(function(){
    angular
        .module("WebAppMaker")
        .config(Configuration);

    function Configuration($routeProvider, $locationProvider) {
        $routeProvider
            // .when("/", {
            //     templateUrl: "views/user/login.view.client.html",
            //     controller: "loginController",
            //     controllerAs: "model"
            // })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "newWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "editWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "newPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "editPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-choose.view.client.html",
                controller: "newWidgetController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "editWidgetController",
                controllerAs: "model"
            })
            // .when("/user/:uid/website/:wid/page/:pid/widget/header", {
            //     templateUrl: "views/widget/widget-heading.view.client.html",
            //     controller: "editWidgetController",
            //     controllerAs: "model"
            // })
            // .when("/user/:uid/website/:wid/page/:pid/widget/image", {
            //     templateUrl: "views/widget/widget-image.view.client.html",
            //     controller: "editWidgetController",
            //     controllerAs: "model"
            // })
            // .when("/user/:uid/website/:wid/page/:pid/widget/youtube", {
            //     templateUrl: "views/widget/widget-youtube.view.client.html",
            //     controller: "editWidgetController",
            //     controllerAs: "model"
            // })
            .otherwise({
                redirectTo: "/login"
            })
    }

})();