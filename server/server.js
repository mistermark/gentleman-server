/*
 * Making these global as they are used across the app
 */

var env = require( './env' );
global.env = env;

var log = require( './lib/log' );
global.logger = log;

var server = require( './app' );

var port = env.port || 1337;
var logger = log.logger;

/*
 * Start the express server 
 */

server.listen( port, function() {
    logger.info( 'Started server on port: ', port );
} );

module.exports = server;
