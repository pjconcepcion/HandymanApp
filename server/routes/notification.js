var db = require('../connection');
var connection = db.connection();

var express = require('express');
var router = express.Router();

router.get('/notification/:userID', function(req,res){
    var userID = req.params.userID;
    var query = 'SELECT n.notificationID,n.remarks,DATE_FORMAT(n.dateReceive,\'%M-%d-%Y\') AS dateReceive,' +
        'n.readFlag, nt.message,' +
        'CASE WHEN nt.type = 0 THEN \'Verification\'' +
            'WHEN nt.type = 1 THEN \'Reports\'' +
            'WHEN nt.type = 2 THEN \'Penalty\'' +
            'WHEN nt.type = 3 THEN \'Top Up\' END AS type ' +
        'FROM notification n INNER JOIN notificationtype nt ON n.notifTypeID = nt.notifTypeID ' + 
        'WHERE userID = ? AND n.flag = 1';
    connection.query(query,[userID],function(error,results){        
        if(error){
            res.send(error);
        }          
        res.json(results);
    });    
});

router.post('/notification/',function(req,res){
    var notificationID = req.body.notificationID;
    var query = 'UPDATE notification SET readFlag = 1 WHERE notificationID = ?';         
    var sql = connection.query(query,[notificationID],function(error,results){
        if(error){
            res.status(600);            
        }        
        res.json(results);
    });
})

module.exports = router;