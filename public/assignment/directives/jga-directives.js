/**
 * Created by Nancy Hong on 24-Feb-17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .directive('sortableDirective', sortableDir);

    function sortableDir() {
        console.log("reached sortableDir");
        function linkFunc(scope, element) {
            element.sortable({axis: 'y'});
        }
        return {
            link: linkFunc
        };
    }
})();