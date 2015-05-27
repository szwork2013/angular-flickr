'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var Builder = require('systemjs-builder');
var merge2 = require('merge2');

// create production index.html
gulp.task('html-index', function () {
    return gulp.src([
        'app/index.html'
    ])
        .pipe($.cheerio(function ($) {
            // remove all script tags
            $('script').remove();

            // append bundled js
            $('body').append("<script src='js/app.min.js'></script>");
        }))
        .pipe($.minifyHtml())
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'html-index'}));
});

// production templates
gulp.task('html-templates', function () {
    return gulp.src([
        'app/templates/**/*.html'
    ])
        .pipe($.minifyHtml())
        .pipe(gulp.dest('dist/templates'))
        .pipe($.size({title: 'html-templates'}));
});

gulp.task('html', function (callback) {
    return runSequence(
        ['html-index', 'html-templates'],
        callback
    );
});

gulp.task('styles', function () {
    var LessPluginCleanCSS = require('less-plugin-clean-css'),
        LessPluginAutoprefix = require('less-plugin-autoprefix'),

    // autoprefixer browsers from WSK
        AUTOPREFIXER_BROWSERS = [
            'ie >= 10',
            'ie_mob >= 10',
            'ff >= 30',
            'chrome >= 34',
            'safari >= 7',
            'opera >= 23',
            'ios >= 7',
            'android >= 4.4',
            'bb >= 10'
        ],
        cleancss = new LessPluginCleanCSS({advanced: true}),
        autoprefix = new LessPluginAutoprefix({browsers: AUTOPREFIXER_BROWSERS});

    // TODO: generate sourcemaps for both streams
    var lessStream = gulp.src([
        'app/**/*.less'
    ])
        .pipe($.less({
            plugins: [cleancss, autoprefix]
        }));

    var bootstrapStream = gulp.src([
        'jspm_packages/github/twbs/**/css/bootstrap.css'
    ])
        .pipe($.uncss({
            html: [
                'app/**/*.html'
            ]
        }));

    return merge2(lessStream, bootstrapStream)
        .pipe($.concat('styles/styles.css'))
        .pipe(gulp.dest('.tmp'))
        .pipe($.csso())
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'styles'}));
});

gulp.task('clean', del.bind(null, [
    '.tmp',
    'dist'
], {dot: true}));

// create self-executing bundle
gulp.task('bundle-sfx', function (callback) {
    var builder = new Builder('system.config.js');
    builder.buildSFX('app', '.tmp/app.js')
        .then(function () {
            return callback();
        })
        .catch(function (ex) {
            callback(new Error(ex));
        });
});

// runs ng-annotate and minifies the bundle
gulp.task('bundle-process', function () {
    return gulp.src(['.tmp/app.js'])
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('bundle', function (callback) {
    return runSequence(
        'bundle-sfx',
        'bundle-process',
        callback
    )
});

// 'development' serve
gulp.task('serve', ['styles'], function () {
    browserSync({
        open: false,
        notify: false,
        server: ['.', '.tmp', 'app']
    });

    // always rebuild styles due to uncss on bootstrap
    gulp.watch(['app/**/*'], ['styles', reload]);
});

// 'production' serve
gulp.task('serve:dist', ['dist'], function () {
    browserSync({
        open: false,
        notify: false,
        ui: false,
        ghostMode: false,
        server: ['dist']
    });

    gulp.watch(['app/**/*.js'], ['bundle', reload]);
    gulp.watch(['app/**/*.html'], ['html', reload]);
    gulp.watch(['app/styles/**/*.less'], ['styles', reload]);
});

gulp.task('dist', function (callback) {
    return runSequence(
        'clean',
        ['bundle', 'styles', 'html'],
        callback
    )
});

gulp.task('default', ['serve']);