var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
 
function logAndEnd(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('compile-js', function() {
    return browserify('./src/app.js')
    .bundle()
    .on('error', logAndEnd)
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('main.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./dist/'));
});


gulp.task('default', ['compile-js']);

gulp.task('watch', function() {
	gulp.watch('./src/*.js', ['compile-js']);
});
