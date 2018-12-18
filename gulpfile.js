var plugin      = 'flamingo',
    gulp        = require('gulp'),
    exec        = require('gulp-exec'),
    fs          = require('fs'),
    del         = require('del');

gulp.task( 'copy-folder', function() {
    return gulp.src( './' ).pipe( exec( 'rm -Rf ./../build; mkdir -p ./../build/' + plugin + '; cp -Rf ./* ./../build/' + plugin + '/' ) );
} );

gulp.task( 'build', gulp.series( ['copy-folder'], function(done) {

    files_to_remove = [
        '**/codekit-config.json',
        'node_modules',
        'gulpfile.js',
        'package.json',
        'package-lock.json',
        'pxg.json',
        'build',
        '.idea',
        '**/*.css.map',
        '**/.git*',
        '*.sublime-project',
        '.DS_Store',
        '**/.DS_Store',
        '__MACOSX',
        '**/__MACOSX',
        '+development.rb',
        '+production.rb',
        'README.md',
        '.labels',
        '.csscomb',
        '.csscomb.json',
        '.codeclimate.yml',
        'tests',
        'circle.yml',
        '.circleci',
        '.labels',
        '.jscsrc',
        '.jshintignore',
        'browserslist',
        'webpack.config.js',
        'src'
    ];

    files_to_remove.forEach( function( e, k ) {
        files_to_remove[k] = '../build/' + plugin + '/' + e;
    } );

    del.sync(files_to_remove, {force: true});
    done();
}));

gulp.task( 'zip', gulp.series( ['build'], function() {
    var versionString = '';
    // get plugin version from the main plugin file
    var contents = fs.readFileSync("./" + plugin + ".php", "utf8");

    // split it by lines
    var lines = contents.split(/[\r\n]/);

    function checkIfVersionLine(value, index, ar) {
        var myRegEx = /^[\s\*]*[Vv]ersion:/;
        if (myRegEx.test(value)) {
            return true;
        }
        return false;
    }

    // apply the filter
    var versionLine = lines.filter(checkIfVersionLine);

    versionString = versionLine[0].replace(/^[\s\*]*[Vv]ersion:/, '').trim();
    versionString = '-' + versionString.replace(/\./g, '-');

    return gulp.src('./')
        .pipe(exec('cd ./../; rm -rf ' + plugin[0].toUpperCase() + plugin.slice(1) + '*.zip; cd ./build/; zip -r -X ./../' + plugin[0].toUpperCase() + plugin.slice(1) + versionString + '.zip ./; cd ./../; rm -rf build'));
}));
