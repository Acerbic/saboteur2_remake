var gulp = require('gulp');

gulp.task('compile', function () {
    'use strict';

    // load twig compiler
    var twig = require('gulp-twig');

    // list of pages for this website
    var pages = require('./pages.json');

    // get all pages that need to be compiled with Twig
    var sources = pages.map(entry => './source/pages/' + entry.src);

    // build menu entries for main navigation
    var menu = pages.filter(entry => entry.name && entry.name.length)
        .map(entry => ({
            name: entry.name,
            url: entry.src.replace(/\.twig$/, '.html')
        }));

    // start compiling
    return gulp.src(sources)
        .pipe(twig({
            data: {
                title: 'Gulp and Twig',
                footer_note: 'Some foot notes',
                top_pages: menu
            }
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('copy-images', function() {
    'use strict';
    return gulp.src('./source/images/*')
        .pipe(gulp.dest('./public/images'))
});

gulp.task('copy-reset-css', function () {
    'use strict';
    return gulp.src('./node_modules/reset-css/reset.css')
        .pipe(gulp.dest('./public'))
})

gulp.task('process-css', function () {
    'use strict';
    return gulp.src('./source/style.css')
        .pipe(gulp.dest('./public'))
})

gulp.task('default', gulp.series('compile', 'copy-images', 'copy-reset-css', 'process-css'));
