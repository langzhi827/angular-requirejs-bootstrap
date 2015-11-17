var gulp = require('gulp'),
    rjs = require('gulp-requirejs'),
    concat = require('gulp-concat');

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
                'angular-route': '../vender/angular-route/angular-route.min',
                'angular-tree': '../vender/angular-ui-tree/dist/angular-ui-tree.min',

                'bootstrap': '../vender/angular-bootstrap/ui-bootstrap.min'
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
        }))
        .pipe(gulp.dest('app/dest')); // pipe it to the output DIR
});

gulp.task('title1', function () {
    return gulp.src(['app/views/title1/controller.js', 'app/views/title1/index.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('app/views/title1/dist')); // pipe it to the output DIR
});

gulp.task('title2', function () {
    return gulp.src(['app/views/title2/controller.js', 'app/views/title2/service.js', 'app/views/title2/index.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('app/views/title2/dist')); // pipe it to the output DIR
});

gulp.task('default', ['mainjs', 'title1', 'title2'], function () {

    console.log('gulp tasks end!!');

});