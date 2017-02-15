(function() {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController)
        .controller("registerController", registerController)
        .controller("profileController", profileController);

    function loginController($location, UserService) {
        var vm = this;
        vm.login = login;
        vm.user = {username: "", password: ""};
        vm.register = register;

        function init() {}
        init();

        function login() {
            var user = UserService
                .findUserByCredentials(vm.user.username, vm.user.password);
            if (user) {
                $location.url("/user/"+user._id);
            } else {
                vm.error = "Unable to login";
            }
        }

        function register() {
            $location.url("/register");
        }
    }

    function registerController($routeParams, $location, UserService) {
        var vm = this;
        vm.register = register;
        var userId = $routeParams["uid"];
        vm.user = {username: "", password: ""};


        function register() {
            if (vm.user.password == vm.user.passwordVerify) {
                var user = UserService.createUser(vm.user);
                $location.url("/user/"+user._id);
            } else {
                vm.error = "Passwords do not match";
            }

        }
    }

    function profileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.user = {};
        vm.updateUser = updateUser;
        vm.logout = logout;
        vm.websites = websites;

        function logout() {
            $location.url("/");
        }

        function init() {
            var user = UserService.findUserById(userId);
            vm.user = user;
        }
        init();

        function updateUser() {
            user = UserService.updateUser(vm.user.userId, vm.user);
            if (vm.user != null) {
                vm.message = "User updated successfully!"
            } else {
                vm.message = "Unable to update user."
            }

        }

        function websites() {
            console.log(userId);
            $location.url("/user/"+userId+"/website");
        }


    }

})();