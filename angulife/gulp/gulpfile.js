////////// requires
var gulp = require('gulp');
var debug = require('gulp-debug');
var concat = require('gulp-concat');
var uglifyjs = require('gulp-uglifyjs');
var sourcemaps = require('gulp-sourcemaps');
var ngmin = require('gulp-ngmin');

////////// code location
var app = {
    js: [
        '../js/angulife.js'
    ],
};

////////// Tasks

gulp.task('concat', function() {
    return gulp.src(app.js)
        .pipe(debug())
        // .pipe(concat('angulife.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task('minify', ['concat'], function() {
    return gulp.src('build/angulife.js')
        .pipe(debug())
        .pipe(ngmin())
        .pipe(uglifyjs('angulife.min.js'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/'));
});