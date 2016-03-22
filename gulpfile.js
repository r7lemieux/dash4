var _       = require('lodash'),
    del     = require('del'),
    gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    //path    = require('path'),
    merge   = require('merge2'),
    through = require('through'),
    $p      = require('gulp-load-plugins')();

var serverDir   = './server',
    publicDir   = './public',
    serverViews = serverDir + '/views',
    indexFile   = serverViews + '/index.html',
    cssSubDir   = '/assets/css',
    cssDir      = publicDir + cssSubDir,
    distDir     = './dist'
    ;

var paths = {
    //js   : [vendorPaths, publicDir + '/**/*.js'],
    app: {
        js  : [publicDir + '/**/*.js'],
        css : [publicDir + '/**/*.css'],
        html: [publicDir + '/**/*.html']
    }
};

function log(data) {
    $p.util.log($p.util.colors.green(data));
}

function debug(data) {
    if (typeof (data) === 'object') {
        for (var field in data) {
            if (data.hasOwnProperty(field)) {
                $p.util.log(' ' + field + ':');
                $p.util.log($p.util.colors.yellow(data[field]));
            }
        }
    } else {
        $p.util.log($p.util.colors.yellow(data));
    }
}

function count(taskName, message) {
    var fileCount = 0;

    function countFiles() {
        fileCount++; // jshint ignore:line
    }

    function endStream() {
        gutil.log(gutil.colors.cyan(taskName + ': ') + fileCount + ' ' + message || 'files processed.');
        this.emit('end'); // jshint ignore:line
    }

    return through(countFiles, endStream);
}

gulp.task('clean', function (cb) {
    return del([distDir], cb);
});

gulp.task('jshint', function () {
    return gulp.src(publicDir + '/**/*.js')
        .pipe($p.jshint('./.jshintrc'))
        .pipe($p.jshint.reporter('jshint-stylish'), {verbose: true})
        .pipe(count('jshint', 'files hint free'));
});

gulp.task('jslint', function () {
    return gulp.src(publicDir + '/**/*.js')
        .pipe($p.jslint('./.jslintrc'))
        .pipe(count('jslint', 'files lint free'));
});

gulp.task('eslint', function () {
    return gulp.src(publicDir + '/**/*.js')
        .pipe($p.eslint('./.eslintrc.js'))
        .pipe(count('eslint', 'files lint free'));
});

gulp.task('csslint', function () {
    return gulp.src(paths.app.css)
        .pipe($p.csslint('.csslintrc'))
        .pipe($p.csslint.reporter())
        .pipe(count('csslint', 'files lint free'));
});

gulp.task('validate', ['jshint', 'eslint', 'csslint'], function () {
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    //wiredep({src:'./server/views/index.html'});
    return gulp
        .src(indexFile)
        .pipe(wiredep())
        .pipe($p.inject(gulp.src(publicDir + '/**/*.js'), {
            ignorePath: '../../public',
            relative  : true,
            starttag  : '<!-- inject:app:js -->'
        }))
        .pipe($p.inject(gulp.src(publicDir + '/**/*.css'), {
            ignorePath: '../../public/',
            relative  : true,
            starttag  : '<!-- inject:app:css -->'
        }))
        .pipe(gulp.dest(serverViews));
});

gulp.task('typescript', function () {
    var tsResult = gulp.src(publicDir + '/**/*.ts')
        .pipe($p.typescript({
            declaration      : true,
            noExternalResolve: true
        }));
    return merge([
        tsResult.dts.pipe(gulp.dest(distDir + '/definitions')),
        tsResult.js.pipe(gulp.dest(distDir))
    ]);
});

gulp.task('watch', function () {
    $p.livereload.listen({interval: 500});
    gulp.watch(paths.app.ts, ['jshint', 'typescript']).on('change', $p.livereload.changed);
    gulp.watch(paths.app.js, ['jshint']).on('change', $p.livereload.changed);
    gulp.watch(paths.app.css, ['csslint']).on('change', $p.livereload.changed);
    gulp.watch(paths.app.html, ['load']).on('change', $p.livereload.changed);
});

gulp.task('dist', ['typescript'], function () {
    gulp.src(cssDir + '/**/*.css')
        .pipe(gulp.dest(distDir + cssSubDir));
});

gulp.task('start', function () {

    $p.nodemon({
            script  : 'server/config/start.js',
            ext     : 'html js',
            env     : {'NODE_ENV': 'development'},
            ignore  : [
                'node_modules/',
                'bower_components/',
                '.DS_Store', '**/.DS_Store',
                '.bower-*',
                '**/.bower-*',
                '**/tests'
            ],
            nodeArgs: ['--debug']
        })
        .on('readable', function () {
            this.stdout.on('data', function (chunk) {
                if (/DASH app started/.test(chunk)) {
                    setTimeout(function () {
                        $p.livereload.reload();
                    }, 300);
                }
                process.stdout.write(chunk);
            });
            this.stderr.pipe(process.stderr);
        });
});

gulp.task('restart', ['start', 'watch'], function () {
});

gulp.task('boot', ['clean', 'typescript', 'dist', 'start', 'watch'], function () {
});

gulp.task('default', ['clean', 'validate', 'inject', 'typescript', 'dist', 'start', 'watch'], function () {
});
