var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var clean = require('gulp-clean');

var cssSrc = ['_dev/sass/*.scss'];
var cssDist = 'assets/css/';

var jsSrc = ['node_modules/highcharts/highcharts.js', '_dev/js/*.js'];
var jsDist = 'assets/js/';

var fontsSrc = 'node_modules/material-icons/iconfont/MaterialIcons-Regular.*';
var fontsDist = 'assets/fonts/';

gulp.task('serve', ['sass', 'js', 'fonts'], function() {
    browserSync.init(null, {
        proxy: 'http://127.0.0.1:8080/edsa-etnetera/'
    });

    gulp.watch(cssSrc, ['sass']);
    gulp.watch(jsSrc, ['js']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('sass', function() {
    gulp.src(cssSrc)
        .pipe(plumber())
        .pipe(sass())
        .pipe(concat('theme.css'))
        .pipe(autoprefixer())
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(cssDist))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    gulp.src(jsSrc)
        .pipe(plumber())
        .pipe(concat('theme.js'))
        .pipe(minify())
        .pipe(gulp.dest(jsDist))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    gulp.src(fontsSrc)
        .pipe(plumber())
        .pipe(gulp.dest(fontsDist))
});

gulp.task('clean', function() {
    gulp.src('assets/')
        .pipe(clean())
});

gulp.task('default', ['serve']);