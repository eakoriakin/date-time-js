const gulp = require('gulp'),
    merge = require('merge2'),
    runSequence = require('run-sequence'),
    del = require('del'),
    typescript = require('gulp-typescript'),
    tsconfig = require('./tsconfig.json'),
    sourcemaps = require('gulp-sourcemaps'),
    tslint = require('gulp-tslint'),
    karma = require('karma'),
    karmaConfig = __dirname + '/tests/karma.config.js';

const paths = {
    root: '',
    ts: ['source/*.ts', '!source/*.d.ts']
};

var build = function (complete) {
    var tasks = ['check-ts', 'copy-ts'];

    if (complete) {
        runSequence(tasks, complete);
    } else {
        runSequence(tasks);
    }
};

gulp.task('copy-ts', function () {
    // Create TS declaration files.
    var tsResult = gulp.src(tsconfig.files, {
        base: './'
    }).pipe(sourcemaps.init()).pipe(typescript(tsconfig.compilerOptions));

    // Create sourcemaps.
    tsResult.js.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.root));

    return merge([
        tsResult.dts.pipe(gulp.dest(paths.root)),
        tsResult.js.pipe(gulp.dest(paths.root))
    ]);
});

gulp.task('check-ts', function () {
    return gulp.src(paths.ts)
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report({
            emitError: false
        }));
});

gulp.task('build', function () {
    build();
});

gulp.task('start', function () {
    build(function () {
        // Watch TS files.
        gulp.watch(paths.ts).on('change', function () {
            build();
        });
    });
});

gulp.task('test', function (done) {
    new karma.Server({
        configFile: karmaConfig,
        action: 'run'
    }, function () {
        done();
    }).start();
});

gulp.task('default', ['start']);