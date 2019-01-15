
const mysql = require( 'mysql' );
class Database {
    constructor( config ) {
      console.log('before connect');
        this.connection = mysql.createConnection( config );
        console.log('after connect');
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
          console.log('this.connect');
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err ); 
                resolve( rows );

            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
          console.log('close');
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

module.exports={Database}
