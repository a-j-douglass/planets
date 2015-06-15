var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
 
gulp.task('browserify', function() {
return browserify('./src/app.js')
.bundle()
//Pass desired output filename to vinyl-source-stream
.pipe(source('main.js'))
// Start piping stream to tasks!
.pipe(gulp.dest('./dist/'));
});


gulp.task('default', ['browserify']);
