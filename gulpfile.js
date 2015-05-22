var gulp = require('gulp');
var gulpHelpers = require('gulp-helpers');
var taskMaker = gulpHelpers.taskMaker(gulp);

var appBase = 'app/';

var paths = {
    styles: appBase + 'styles'
};

taskMaker.defineTask('less', {
    src: paths.styles + '/**/*.less',
    dest: paths.styles
});