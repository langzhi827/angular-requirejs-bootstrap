require.config({
    baseUrl: './',
    paths: {
        app: 'js/app',
        config: 'js/config/config',
        appjs: 'js/config/appjs',

        angular: 'vender/angular/angular.min',
        'angular-ui-router': 'vender/angular-ui-router/release/angular-ui-router.min',
        'angular-tree': 'vender/angular-ui-tree/dist/angular-ui-tree.min',

        'bootstrap': 'vender/angular-bootstrap/ui-bootstrap.min'
    },
    //这个配置是你在引入依赖的时候的包名
    shim: {
        angular: {
            exports: 'angular'
        },
        'angular-ui-router': ['angular'],
        'angular-tree': ['angular'],
        bootstrap: ['angular']
    }
});

require([
    'app',
    'appjs'
], function () {
    angular.bootstrap(document, ['app']);
});