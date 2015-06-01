'use strict'

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload')
;

gulp.task('build-css', function() {
    return gulp.src('public/assets/css/*.css')
        .pipe(gulp.dest('build')).on('error', gutil.log)
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function(){
livereload.listen({interval:300});
gulp.watch('public/assets/css/*.css', ['build-css']);
    gulp.watch('public/**/*.js', ['build-js']);
    gulp.watch('public/views/*.html', []);
});

gulp.task('start', function () {
    nodemon({
        script: 'bin/www'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
})

// Default Task
gulp.task('default', ['build-css', 'start', 'watch'], function() {

});


//gulp.task('develop', function () {
//    nodemon({ script: 'app.js', ext: 'html js' })
//        .on('restart', function () {
//            console.log('restarted!')
//        })
//})