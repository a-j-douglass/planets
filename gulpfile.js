var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var deploy = require('gulp-gh-pages');
 
function logAndEnd(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('compile-js', function() {
    return browserify('./src/app.js')
    .bundle()
    .pipe(source('main.js'))
    .on('error', logAndEnd)
    //Pass desired output filename to vinyl-source-stream
    // Start piping stream to tasks!
    .pipe(gulp.dest('./dist/'));
});


gulp.task('compile-js-min', function() {
    return browserify('./src/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', logAndEnd)
    //Pass desired output filename to vinyl-source-stream
    // Start piping stream to tasks!
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['compile-js']);

gulp.task('watch', function() {
	gulp.watch('./src/*.js', ['compile-js']);
 
gulp.task('deploy', ['browserify'], function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});
