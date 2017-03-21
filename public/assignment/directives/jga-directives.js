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
            element.sortable({
                // axis: 'y'
                start: function(e, ui) {
                    // creates a temporary attribute on the element with the old index
                    $(this).attr('data-previndex', ui.item.index());
                },
                update: function(e, ui) {
                    // gets the new and old index then removes the temporary attribute
                    var newIndex = ui.item.index();
                    var oldIndex = $(this).attr('data-previndex');
                    $(this).removeAttr('data-previndex');
                }

            });

        }
        return {
            link: linkFunc
        };
    }
})();