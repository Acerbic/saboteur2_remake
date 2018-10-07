var gulp = require('gulp');

gulp.task('compile', function () {
    'use strict';
    var twig = require('gulp-twig');
    return gulp.src('./source/index.twig')
        .pipe(twig({
            data: {
                title: 'Gulp and Twig',
                footer_note: 'Some foot notes',
                top_pages: [
                    {
                        name: 'one',
                        url: 'index.html'
                    },
                    {
                        name: 'two',
                        url: 'index.html'
                    },
                    {
                        name: 'three',
                        url: 'index.html'
                    }
                ]
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
