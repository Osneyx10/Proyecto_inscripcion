var mysql = require('mysql');

var pool = null;

var config = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Ojhv24216413..',
    database: 'unexpo_db',
    port: 3306
};

pool = mysql.createPool(config);

function createConnection(){
    return new Promise ((resolve, reject) => {
        pool.getConnection(function (err,con){
            if (err) {
                console.log(err)
                reject(err)
                if (con)
                    con.release();
                return    
            }

            if (con)
                resolve(con)
        })
    })
}

module.exports.createConnection = createConnection;