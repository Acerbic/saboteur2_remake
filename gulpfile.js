var gulp = require('gulp');
var watch = require('gulp-watch');
var twig = require('gulp-twig');

/**
 * Returns a gulp plugin prepared for compiling a twig page
 */
function createPageCompiler() {
    'use strict';

    // list of pages for this website
    var menu_data = require('./mainmenu.json');

    // build menu entries for main navigation
    var menu = menu_data.filter(entry => entry.name && entry.name.length)
        .map(entry => ({
            name: entry.name,
            url: entry.src.replace(/\.twig$/, '.html')
        }));

    return twig({
        data: {
            title: 'Default title',
            footer_note: 'Default footer',
            top_pages: menu
        }
    });
}

gulp.task('watch-pages', function () {
    'use strict';

    // Endless stream mode
    watch('./source/pages/*.twig', { ignoreInitial: false, verbose: true })
        .pipe(createPageCompiler())
        .pipe(gulp.dest('./public'));
});

gulp.task('watch', gulp.parallel(
    'watch-pages',
    function () {
        // watch css
        watch('./source/*.css', { ignoreInitial: false, verbose: true }, gulp.task('process-css'));
    })
);

/**
 * Process all twig files
 */
gulp.task('compile', function () {
    'use strict';

    // start compiling
    return gulp.src('./source/pages/*.twig')
        .pipe(createPageCompiler())
        .pipe(gulp.dest('./public'));
});

gulp.task('copy-images', function() {
    'use strict';
    return gulp.src('./source/images/*')
        .pipe(gulp.dest('./public/images'))
});

gulp.task('process-css', function () {
    'use strict';
    return gulp.src(['./source/style.css', './node_modules/reset-css/reset.css'])
        .pipe(gulp.dest('./public'))
})

gulp.task('default', gulp.parallel('compile', 'copy-images', 'process-css'));