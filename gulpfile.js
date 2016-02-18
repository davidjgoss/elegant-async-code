var gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    babel = require("gulp-babel"),
    sass = require("gulp-sass");

gulp.task("react", function() {
    gulp.src("src/js/app.js")
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["babel-preset-react"]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/js"));
});

gulp.task("styles", function() {
    gulp.src("src/scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"));
});

gulp.task("dist", ["react", "styles"]);

gulp.task("watch", ["dist"], function() {
    gulp.watch("src/js/app.js", ["react"]);
    gulp.watch("src/scss/style.scss", ["styles"]);
});
