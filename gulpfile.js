var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var deploy = require('gulp-gh-pages');
var webserver = require('gulp-webserver');

var dist = './dist/';
 
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
    .pipe(gulp.dest(dist));
});

gulp.task('html', function () {
  return gulp.src('src/**/*.html').pipe(gulp.dest(dist));
});

gulp.task('css', function () {
  return gulp.src('src/**/*.css').pipe(gulp.dest(dist));
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
    .pipe(gulp.dest(dist));
});

gulp.task('build', ['compile-js', 'html', 'css']);

gulp.task('default', ['build']);

gulp.task('watch', function() {
	gulp.watch('./src/*.js', ['compile-js']);
});
 
gulp.task('deploy', ['build'], function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});

gulp.task('webserver', function() {
  gulp.src(dist)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});
