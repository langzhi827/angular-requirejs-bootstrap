var gulp = require('gulp'),
    rjs = require('gulp-requirejs');

gulp.task('mainjs', function () {
    return gulp.src('/')
        .pipe(rjs({
            name: 'main',
            baseUrl: 'app/js',
            out: 'main.min.js',
            paths: {
                app: 'app',
                config: 'config/config',
                appjs: 'config/appjs',

                angular: '../vender/angular/angular.min',
                'angular-ui-router': '../vender/angular-ui-router/release/angular-ui-router.min',
                'angular-tree': '../vender/angular-ui-tree/dist/angular-ui-tree.min',

                'bootstrap': '../vender/angular-bootstrap/ui-bootstrap.min'
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
        }))
        .pipe(gulp.dest('app/dest')); // pipe it to the output DIR
});

gulp.task('default', ['mainjs'], function () {

    console.log('gulp tasks end!!');

});