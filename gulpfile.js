var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');


var cssFolder = 'assets/css/';
var scssFiles = '_dev/sass/*.scss';

gulp.task('serve', ['sass'], function() {
    browserSync.init(null, {
        proxy: "http://127.0.0.1:8080/edsa-etnetera/"
    });

    gulp.watch(scssFiles, ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src(scssFiles)
        .pipe(sass())
        .pipe(gulp.dest(cssFolder))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);