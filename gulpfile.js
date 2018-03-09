var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var watch = require("gulp-watch");

gulp.task('cssmin', function() {
    gulp.src(['less/*.less'])
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest('css'))
});

gulp.task('cssdev', function() {
    gulp.src(['less/style.less'])
        .pipe(less())
        .pipe(gulp.dest('css'))
});

gulp.task('dev', ['cssdev']);

gulp.task('default', ['cssmin']);

gulp.task('stream', function () {
    // Endless stream mode
    gulp.watch(['less/*.less'], ['cssdev']);
});
