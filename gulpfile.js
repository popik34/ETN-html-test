var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');

var cssSrc = '_dev/sass/*.scss';
var cssDist = 'assets/css/';

var jsSrc = '_dev/js/*.js';
var jsDist = 'assets/js/';

gulp.task('serve', ['sass', 'js'], function() {
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
        .pipe(gulp.dest(cssDist))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    gulp.src(jsSrc)
        .pipe(plumber())
        .pipe(concat('theme.js'))
        .pipe(gulp.dest(jsDist))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);