  require.config({
      baseUrl: './',
      paths: {
          app: 'js/app',
          config: 'js/config/config',

          angular: 'vender/angular/angular.min',
          'angular-route': 'vender/angular-route/angular-route.min',
          'angular-tree': 'vender/angular-ui-tree/dist/angular-ui-tree.min',

          'bootstrap': 'vender/angular-bootstrap/ui-bootstrap.min'
      },
      //这个配置是你在引入依赖的时候的包名
      shim: {
          angular: {
              exports: 'angular'
          },
          'angular-route': ['angular'],
          'angular-tree': ['angular'],
          bootstrap: ['angular']
      }
  });

  require([
    'app',
    'js/config/appjs'
], function () {
      angular.bootstrap(document, ['app']);
  });