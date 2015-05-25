var gulp = require('gulp');
var gulpHelpers = require('gulp-helpers');
var taskMaker = gulpHelpers.taskMaker(gulp);
var runSequence = gulpHelpers.framework('run-sequence');

var paths = {
    minify: 'dist/**/*.js',
    output: 'dist/',
    sources: 'app/**/*.js',
    styles: 'app/styles'
};

var babelOpts = {
    modules: 'system',
    moduleIds: false,
    externalHelpers: true,
    comments: true,
    compact: false
};

taskMaker.defineTask('clean', {taskName: 'clean', src: paths.output});

taskMaker.defineTask('less', {
    src: paths.styles + '/**/*.less',
    dest: paths.output + 'styles/'
});

taskMaker.defineTask('babel', {
    taskName: 'babel',
    src: paths.sources,
    dest: paths.output,
    ngAnnotate: true,
    compilerOptions: babelOpts
});


taskMaker.defineTask('minify', {
    taskName: 'minify',
    src: paths.minify,
    dest: paths.output
});

gulp.task('compile', function(callback) {
    return runSequence('less', 'babel', 'minify', callback);
});

gulp.task('recompile', function(callback) {
    return runSequence('clean', ['compile'], callback);
});