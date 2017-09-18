define([
    'angular',
    '../js/routeResolve',
    'angular-ui-router'
], function (angular, routeResolve) {

    var module = angular.module('app.router', ['ui.router']);

    module.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when("", "/title1");

        $stateProvider.state('title1', {
            url: '/title1',
            templateUrl: '/views/title1/index.html',
            controller: 'setDataController',
            resolve: routeResolve([
                'views/title1/index'
            ])
        }).state('title2', {
            url: '/title2',
            templateUrl: '/views/title2/index.html',
            controller: 'metaDataController',
            resolve: routeResolve([
                'views/title2/index'
            ])
        });

    }]);

});