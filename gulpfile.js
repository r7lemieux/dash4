﻿var _       = require('lodash'),
    del     = require('del'),
    gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    //path    = require('path'),
    merge   = require('merge2'),
    through = require('through'),
    wiredep = require('wiredep').stream,
    $p      = require('gulp-load-plugins')();

var serverDir   = './server',
    publicDir   = './public',
    //vendorDir   = './bower_components',
    serverViews = serverDir + '/views',
    indexFile   = serverViews + '/index.html',
    //vendorJs    = [
    //    'bootstrap/dist/js/bootstrap.js',
    //    'es6-shim/es6-shim.js',
    //    'jquery/dist/jquery.js'
    //],
    //vendorPaths = _.map(vendorJs, function (jsPath) {
    //    return vendorDir + '/' + jsPath;
    //})
    es6Dir      = publicDir + 'es6',
    cssSubDir   = '/assets/css',
    cssDir      = publicDir + cssSubDir,
    distDir     = './dist'
    ;

var paths = {
    //js   : [vendorPaths, publicDir + '/**/*.js'],
    app: {
        js  : [publicDir + '/**/*.js'],
        ts  : [publicDir + '/**/*.ts'],
        tsjs: [distDir + '/**/*.js'],
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

gulp.task('clean', function () {
    return del.sync([distDir], {force: true});
});

gulp.task('jshint', function () {
    return gulp.src(publicDir + '/**/*.js')
        .pipe($p.jshint('./.jshintrc'))
        .pipe($p.jshint.reporter('jshint-stylish'), {verbose: true})
        .pipe(count('jshint', 'files hint free'));
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

gulp.task('validate', ['jshint', 'csslint'], function () {
});

gulp.task('inject', ['typescript', 'loadcss'], function () {
    //wiredep({src:'./server/views/index.html'});
    return gulp
        .src(indexFile)
        .pipe(wiredep())
        .pipe($p.inject(gulp.src([publicDir + '/*.js', distDir + '/*.js']), {
            ignorePath: ['../../dist', '../../public'],
            relative  : true,
            starttag  : '<!-- inject:appdef:js -->'
        }))
        .pipe($p.inject(gulp.src([publicDir + '/*/**/*.js', distDir + '/*/**/*.js']), {
            ignorePath: ['../../dist', '../../public'],
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

gulp.task('babel', function () {
    return gulp.src([publicDir + '/**/*.js', es6Dir + '/**/*.js'])
        .pipe($p.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(distDir));
});

gulp.task('typescript2', function () {
    var tsResult = gulp.src(publicDir + '/**/*.ts')
        .pipe($p.typescript({
            target       : 'ES5',
            declaration  : true,
            noImplicitAny: false
        }));
//     return tsResult.pipe(gulp.dest(distDir));
    return merge([
        tsResult.dts.pipe(gulp.dest(distDir + '/definitions')),
        tsResult.js.pipe(gulp.dest(distDir))
    ]);
});

gulp.task('typescript', ['clean'], function () {
    return gulp.src(publicDir + '/**/*.ts')
        .pipe($p.typescript({
            target       : 'ES5',
            declaration  : true,
            noImplicitAny: false
        }))
        .pipe(gulp.dest(distDir));
});

gulp.task('reloadtypescript', function () {
    console.log('521 reloadtypescript');
    return gulp.src(publicDir + '/**/*.ts')
        .pipe($p.typescript({
            target       : 'ES5',
            declaration  : true,
            noImplicitAny: false
        }))
        .pipe(gulp.dest(distDir))
        .pipe($p.livereload());
});

gulp.task('loadhtml', function () {
    return gulp.src(paths.app.html)
        .pipe($p.livereload());
});

gulp.task('loadcss', function () {
    log('111 loadcss');
    return gulp.src(paths.app.css)
//         .pipe(gulp.dest(distDir + cssSubDir))
        .pipe($p.livereload());
});

gulp.task('watch', function () {
    $p.livereload.listen();
    gulp.watch(paths.app.ts, ['reloadtypescript']);
    gulp.watch(paths.app.js, ['jshint']).on('change', $p.livereload.changed);
    gulp.watch(paths.app.css, ['loadcss']);
    gulp.watch(paths.app.html, ['loadhtml']);
});

gulp.task('start', function () {

    $p.nodemon({
            script  : 'server/config/start.js',
            ext     : 'html js css',
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
        .on('restart', function () {
            setTimeout(function () {
                log('Reload ... ');
                $p.livereload.reload();
            }, 100);
        });
});

gulp.task('restart', ['start', 'watch'], function () {
});

gulp.task('boot', ['clean', 'inject', 'start', 'watch'], function () {
});

gulp.task('default', ['validate', 'inject', 'start', 'loadhtml', 'loadcss', 'watch'], function () {
});
