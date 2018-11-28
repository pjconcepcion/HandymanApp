var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'handyman'
})

//mysql://b664d5b6138c6a:ac4e4b03@us-cdbr-iron-east-01.cleardb.net/heroku_4723b1700a1527e?reconnect=true
//mysql://root:concepcion@127.0.0.1:3306/handyman
// var connection = mysql.createConnection('mysql://b9d6e96b0ba1e9:a93c970d@us-cdbr-iron-east-01.cleardb.net/heroku_063d170940f5829?reconnect=true');

exports.connect = function reconnect(){
    var connection = mysql.createConnection('mysql://b9d6e96b0ba1e9:a93c970d@us-cdbr-iron-east-01.cleardb.net/heroku_063d170940f5829?reconnect=true');
    connection.connect(function(error){
        if(error){
            console.log('Cannot connect to database - ' ,error.code);
            setTimeout(reconnect,2000);
        }else{
            console.log('Connected to the database')
        }
    })

    connection.on('error',function(error){
        if(error.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('Reconnecting');
            reconnect();
        }else{
            throw error;
        }
    })
}

exports.connection = function() {
    return connection;
};