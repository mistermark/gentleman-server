var env = require( './env' );
var log = require( './lib/log' );
var server = require( './handlers/app' );

var port = env.port || 1337;
var logger = log.logger;

/*
 * Making these global as they are used across the app
 */

global.env = env;
global.logger = logger;

/*
 * Start the express server 
 */

server.listen( port, function() {
    logger.info( 'Started server on port: ', port );
} );
