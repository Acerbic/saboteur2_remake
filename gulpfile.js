var gulp = require('gulp');
var watch = require('gulp-watch');
var twig = require('gulp-twig');
var data = require('gulp-data');
var fs = require('fs');

/**
 * Load and prepare main nav menu data
 */
function getMenuData() {
    'use strict';

    var menu_data = JSON.parse(fs.readFileSync('./mainmenu.json'))
                        .map(entry => ({
                            name: entry.name,
                            url: entry.src.replace(/\.twig$/, '.html')
                        }));
    return {top_pages: menu_data};
}

/**
 * Watch individual pages and recompile as needed (only the changed page is 
 * recompiled)
 */
gulp.task('watch-pages', function () {
    'use strict';

    // Endless stream mode
    return watch('./source/pages/*.twig', { ignoreInitial: false, verbose: true })
        .pipe(data(getMenuData))
        .pipe(twig())
        .pipe(gulp.dest('./public'));
});

/**
 * Watch additional resources - twig components, menu listing.
 * The whole project is recompiled on change
 */
gulp.task('watch-twig-extra', function () {
    'use strict';

    return watch(
        ['./mainmenu.json', './source/*.twig'],
        { verbose: true }, 
        gulp.task('compile')
    );
});

/**
 * Group task that starts all watch tasks for the project
 */
gulp.task('watch', gulp.parallel(
    'watch-pages',
    'watch-twig-extra',
    // inlined task - watch css file
    function watchCss() {
        'use strict';

        return watch(
            './source/*.css',
            { ignoreInitial: false, verbose: true },
            gulp.task('process-css')
        );
    })
);

/**
 * Compile all *.twig page templates into *.html files
 */
gulp.task('compile', function () {
    'use strict';

    // start compiling
    return gulp.src('./source/pages/*.twig')
        .pipe(data(getMenuData))
        .pipe(twig())
        .pipe(gulp.dest('./public'));
});

/**
 * Copy static files into results directory - ready for deployment
 */
gulp.task('copy', function() {
    'use strict';

    return gulp.src(
            ['./source/images/**/*', './source/audio/**/*'],
            {base: './source'}
        )
        .pipe(gulp.dest('./public'))
});

/**
 * Do CSS processing, as needed, and put output into results directory
 */
gulp.task('process-css', function () {
    'use strict';

    return gulp.src(['./source/style.css', './node_modules/reset-css/reset.css'])
        .pipe(gulp.dest('./public'))
})

/**
 * Default task - full build of the project. The result of this task
 * is a './public' directory, containing static *.html files, and all resources
 * used by the website, ready to be deployed.
 */
gulp.task('default', gulp.parallel('compile', 'copy', 'process-css'));