'use strict';

var gulp = require( 'gulp' );
var nodemon = require( 'gulp-nodemon' );
var mocha = require( 'gulp-mocha' );
var path = require( 'relative-path' );
var config = require( './config' );

/* ========== Configs ========== */

var filepaths = config.files;
var mochaOpts = config.mochaOpts;
var serverConf = config.serverConf; //Settings for nodeMon

/* ========== TASKS ========== */

gulp.task( 'dev', function() {
    return startNodeMon( 'development' );
} );

gulp.task( 'prod', function() {
    return startNodeMon( 'production' );
} );

gulp.task( 'server-test', function() {
    return mochaTest( 'server', mochaOpts );
} );

gulp.task( 'client-test', function() {
    return mochaTest( 'client', mochaOpts );
} );

/* ========== TASK FUNCTIONS ========== */

//Starts nodemon server, env is the environment the server is running in
//development for local dev, production on a server
function startNodeMon( env ) {

    serverConf.env = {
        NODE_ENV: env
    };

    return nodemon( serverConf );

}

function mochaTest( type, config ) {
    var typePaths = resolve( type );

    return gulp.src( typePaths.js.specs )
        .pipe( mocha( config ) );
}

/* HELPERS */

//Resolves config paths to absolute path
function resolve( type ) {
    var files = filepaths[ type ];

    if ( !files ) {
        return;
    }

    //Gets list of extensions that should be resolved
    //Loops through each extension, and prepends all props with basedir
    var ext = files.ext;
    var basedir = __dirname + files.dir;

    var resolved = {
        dir: basedir,
        ext: ext
    };

    ext.forEach( function( key, i ) {
        resolved[ key ] = {};

        var extFiles = files[ key ];

        for ( var fileType in extFiles ) {
            resolved[ key ][ fileType ] = extFiles[ fileType ]
                .map( function map( v, i ) {
                    return basedir + v;
                } );
        }
    } );

    return resolved;
}
