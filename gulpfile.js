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

gulp.task('watch-pages', function () {
    'use strict';

    // Endless stream mode
    return watch('./source/pages/*.twig', { ignoreInitial: false, verbose: true })
        .pipe(data(getMenuData))
        .pipe(twig())
        .pipe(gulp.dest('./public'));
});

gulp.task('watch-menu', function () {
    'use strict';

    return watch('./mainmenu.json', { verbose: true }, gulp.task('compile'));
});


gulp.task('watch', gulp.parallel(
    'watch-pages',
    'watch-menu',
    function watchCss() {
        'use strict';

        return watch('./source/*.css', { ignoreInitial: false, verbose: true }, gulp.task('process-css'));
    })
);

/**
 * Process all twig files
 */
gulp.task('compile', function () {
    'use strict';

    // start compiling
    return gulp.src('./source/pages/*.twig')
        .pipe(data(getMenuData))
        .pipe(twig())
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