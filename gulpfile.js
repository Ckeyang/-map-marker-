/**
 * Created by Administrator on 2016/3/14.
 */
var gulp=require('gulp');

var webserver = require('gulp-webserver');
/**
 * ����һ��web������,������һ����̬����
 */
gulp.task('webserver', function() {
    gulp.src(['./'])
        .pipe(webserver({
            host: '0.0.0.0',
            port:80,
            livereload: true,
            directoryListing: {
                enable:true,
                path: '.'
            },
            open: false//,
            //fallback: 'index.html'
        }));
});
