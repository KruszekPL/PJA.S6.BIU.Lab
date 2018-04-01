// grab our gulp packages
var gulp  = require('gulp'),
    ignore = require('gulp-ignore');

// create a default task and just log a message
gulp.task('default', function() {
  return $.log('Gulp is running!')
});

gulp.task('copy',function(){
    gulp.src('src/**/*.*')
    .pipe(ignore.exclude('*.ts'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
    gulp.watch('src/**/*.*', ['copy']);
});
