var db = require('../connection');
var connection = db.connection();

var express = require('express');
var router = express.Router();

router.get('/transaction/:type/:userID/', function(req,res){
    var transactor = req.params.type;
    var userID = req.params.userID;
    var query = 'SELECT t.transactionID,' +
            'DATE_FORMAT(b.date,\'%M %d, %Y %I:%i %p\') AS date, s.name AS Service ' +
            'FROM transaction t ' +
            'INNER JOIN booking b ON t.bookingID = b.bookingID ' +
            'INNER JOIN services s on b.serviceID = s.serviceID ' +
            'WHERE ' + transactor + ' = ? AND status = 1 ' +
            'ORDER BY b.date DESC'
    connection.query(query,[userID],function(error,results){        
        if(error){
            res.send(error);
        }          
        res.json(results);  
    });   
});

router.get('/transaction/:type/:userID/:transactionID', function(req,res){
    var otherPt = req.params.type == 'handymanID'? 'b.customerID' :'t.handymanID';
    var userID = req.params.userID;
    var transactionID = req.params.transactionID;
    var query = 'SELECT u.firstName,u.middleName,u.lastName, DATE_FORMAT(b.date,\'%M %d, %Y %I:%i %p\') AS date, ' +
        'b.amount, b.remarks, COALESCE(rating,0) as rating, COALESCE(comment,\'\') as comment, ' +
        's.name as service,ss.description, fc.amount as formAmount, f.title ' +
        'FROM transaction t ' +
        'INNER JOIN booking b ON b.bookingID = t.bookingID ' +
        'INNER JOIN users u ON ' + otherPt + ' = u.userID ' +
        'INNER JOIN services s ON b.serviceID = s.serviceID ' +
        'INNER JOIN selected ss ON b.groupchoicesID = ss.groupchoicesID ' +
        'INNER JOIN formchoices fc ON ss.choicesID = fc.formChoicesID ' +
        'INNER JOIN feedback fb ON t.transactionID = fb.transactID ' +
        'INNER JOIN form f ON f.formID = fc.formID ' +
        'WHERE t.transactionID = ? AND fb.userID = ?'
    connection.query(query,[transactionID,userID],function(error,results){        
        if(error){
            res.send(error);
        }          
        res.json(results);  
    });   
});

module.exports = router;