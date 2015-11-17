define([
    'angular',
    '../js/routeResolve',
    'angular-route'
], function (angular, routeResolve) {

    var module = angular.module('app.router', ['ngRoute']);

    module.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/title1', {
            templateUrl: 'views/title1/index.html',
            controller: 'setDataController',
            resolve: routeResolve([
                'views/title1/index'
            ])
        }).when('/title2', {
            templateUrl: 'views/title2/index.html',
            controller: 'metaDataController',
            resolve: routeResolve([
                'views/title2/index'
            ])
        }).otherwise({
            redirectTo: '/title1'
        });

    }]);

});