define([
    'angular',
    './directives'
], function (angular, directives) {

    directives.directive('mainNavbar', ['$location', function ($location) {
        return {
            restrict: 'AE',
            controller: function ($scope, $element) {},
            link: function ($scope, $element, $attrs) {

                var as = $element.find('a');
                as.parent().removeClass('active');

                var href = '#' + $location.path();
                angular.forEach(as, function (a) {
                    var cur_a = angular.element(a);
                    if (cur_a.attr('href') == href) {
                        cur_a.parent().addClass('active');
                    }
                });

                as.bind('click', function () {
                    as.parent().removeClass('active');
                    angular.element(this).parent().addClass('active');
                });

            }

        }
    }]);


});