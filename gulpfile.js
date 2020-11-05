const gulp = require("gulp");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const scssimport = require('gulp-shopify-sass');
const execSync = require('child_process').execSync;

gulp.task('concat-style', () => {
  return gulp
    .src(['variables', 'rules'].map(entry => `src/style/_${entry}.scss`))
    .pipe(concat('style.scss'))
    .pipe(scssimport())
    .pipe(
      rename((p) => {
        p.basename = p.basename.replace('.cat.scss', '');
        p.extname = '.scss';
      }),
    )
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-scss', () => {
  execSync('cp -R src dist');
});

gulp.task("default", ['concat-style', 'copy-scss']);
