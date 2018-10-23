const gulp = require('gulp');
const watch = require('gulp-watch');
const twig = require('gulp-twig');
const data = require('gulp-data');
const fs = require('fs');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

/**
 * Load and prepare main nav menu data
 */
function getMenuData() {
    'use strict';

    const menu_data = JSON.parse(fs.readFileSync('./mainmenu.json'))
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
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true /* dev/prod ? */ }))
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
    },
    function watchJs() {
        'use strict';

        return watch('./source/*.js', { ignoreInitial: false, verbose: true })
            .pipe(gulp.dest('./public'));
    }
));


/**
 * Compile all *.twig page templates into *.html files
 */
gulp.task('compile', function () {
    'use strict';

    // start compiling
    return gulp.src('./source/pages/*.twig')
        .pipe(data(getMenuData))
        .pipe(twig())
        .pipe(htmlmin({ collapseWhitespace: true }))
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
        .pipe(gulp.src('./source/images/favicon.ico'))
        .pipe(gulp.src('./source/*.js'))
        .pipe(gulp.dest('./public'))
});

/**
 * Do CSS processing, as needed, and put output into results directory
 */
gulp.task('process-css', function () {
    'use strict';

    return gulp.src(['./source/style.css', './source/ie9_down.css'])
        .pipe(autoprefixer({
            // browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(gulp.dest('./public'))
})

/**
 * Default task - full build of the project. The result of this task
 * is a './public' directory, containing static *.html files, and all resources
 * used by the website, ready to be deployed.
 */
gulp.task('default', gulp.parallel('compile', 'copy', 'process-css'));