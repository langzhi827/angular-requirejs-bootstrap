define([
    'angular',
    'bootstrap',
    'angular-tree'
], function (angular) {

    //存放应用依赖模块
    var app_modules = [
        'app.router',
        'app.controllers',
        'app.directives',
        'app.filters',
        'app.services',
        'ui.bootstrap',
        'ui.tree'
    ];

    var app = angular.module('app', app_modules);

    app.config.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];
    app.config(function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

        app.registerController = $controllerProvider.register;
        app.registerDirective = $compileProvider.directive;
        app.registerFilter = $filterProvider.register;
        app.registerFactory = $provide.factory;
        app.registerService = $provide.service;

    });

    return app;
});