var gulp = require('gulp');

gulp.task('compile', function (done) {
    'use strict';
    var twig = require('gulp-twig');
    return gulp.src('./source/index.twig')
        .pipe(twig({
            data: {
                title: 'Gulp and Twig',
                benefits: [
                    'Fast',
                    'Flexible',
                    'Secure'
                ]
            }
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('default', gulp.series('compile'));
