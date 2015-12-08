
var gulp =  require('gulp'),
    concat = require('gulp-concat');

gulp.task('default', function() {
    return gulp.src(
        [
            './source/index.js',
            './source/commons.js',
            './source/menu_ps.js',
            './source/functions_ps.js'
        ]
    ).pipe(concat('Ps.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch('./source/*.js', ['default']);
});
