var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    karma = require('karma'),
    karmaConfig = __dirname + '/tests/config/karma/karma.js',
    jshint = require('gulp-jshint');

var paths = {
    dist: {
        root: 'dist/'
    },
    source: {
        js: 'source/**/*.js'
    }
};

var build = function(complete) {
    var tasks = ['check-js', 'copy-js', 'copy-and-minify-js'];

    if (complete) {
        runSequence('clean', tasks, complete);
    } else {
        runSequence('clean', tasks);
    }
}

gulp.task('clean', function() {
    del.sync([paths.dist.root + '/**/*', '!' + paths.dist.root]);
});

gulp.task('copy-js', function() {
    return gulp.src(paths.source.js)
        .pipe(concat('date-time.js'))
        .pipe(gulp.dest(paths.dist.root));
});

gulp.task('copy-and-minify-js', function() {
    return gulp.src(paths.source.js)
        .pipe(uglify())
        .pipe(concat('date-time.min.js'))
        .pipe(gulp.dest(paths.dist.root));
});

gulp.task('check-js', function() {
    return gulp.src(paths.source.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build', function() {
    build();
});

gulp.task('start', function() {
    build(function() {
        gulp.watch(paths.source.js).on('change', function() {
            build();
        });
    });
});

gulp.task('test', function(done) {
    new karma.Server({
            configFile: karmaConfig,
            action: 'run'
        }, function() {
            done();
        })
        .start();
});

gulp.task('test-single', function(done) {
    new karma.Server({
            configFile: karmaConfig,
            singleRun: true
        }, function() {
            done();
        })
        .start();
});

gulp.task('default', ['start']);
