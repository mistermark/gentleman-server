var fs = require( 'fs' );
var config = {};

config.delete = function( path, cb ) {
    fs.exists( path, function( exists ) {
        if ( exists ) {
            fs.unlink( path, function( err ) {
                var success = null;
                if ( !err ) {
                    success = "Successfully removed " +
                        ' ' + path;
                }

                cb( err, success );
            } );
        }
    } );
};

module.exports = config;
