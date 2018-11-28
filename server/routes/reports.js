var db = require('../connection');
var connection = db.connection();

var express = require('express');
var router = express.Router();

router.get('/reports', function(req,res){
    var query = 'SELECT name,description FROM reporttype WHERE flag = 1';
    connection.query(query,function(error,results){        
        if(error){
            console.log('Get Report' + error);
            res.send(error);
        }          
        res.json(results);
    });    
});

router.post('/reports',function(req,res){
    var report = req.body;
    if(!report){
        res.status(400);
        res.json({
            error: 'Bad Data'
        });
    }else{
        var transactionID = report.transactionID;
        var reporterID = report.reporterID;
        var reportedID = report.reportedID;
        var reportType = report.reportType;
        var comment = report.comment;

        var query = 'INSERT INTO reports (transactionID,reporterID,reportedID,reportTypeID,date,comment) ' +
            'VALUES (?,?,?,(SELECT reportTypeID FROM reporttype WHERE name = ?),NOW(),?)';
        connection.query(query,[transactionID,reporterID,reportedID,reportType,comment],function(error,result){
            if(error){
                res.send(error);
                console.log('Post report' + error);
            }
            res.json(result);
        }); 

    }
})

router.post('/reports/quick',function(req,res){
    var report = req.body;
    if(!report){
        res.status(400);
        res.json({
            error: 'Bad Data'
        });
    }else{
        var transactionID = report.transactionID;
        var userID = report.userID;
        var reportType = report.reportType;
        var comment = report.comment;
        var query = 'SELECT customerID,handymanID FROM transaction t ' +
            'INNER JOIN booking b ON t.bookingID = b.bookingID WHERE t.bookingID = ?';
        connection.query(query,[transactionID],function(error,result){
            if(!error){
                var handymanID = result[0].handymanID;
                var customerID = result[0].customerID;
                var reporterID, reportedID;
                if(handymanID == userID){
                    reporterID = handymanID;
                    reportedID = customerID;
                }else{
                    reporterID = customerID;
                    reportedID = handymanID;
                }
                var query = 'INSERT INTO reports (transactionID,reporterID,reportedID,reportTypeID,date,comment) ' +
                    'VALUES ((SELECT transactionID FROM transaction WHERE bookingID = ?),?,?,(SELECT reportTypeID FROM reporttype WHERE name = ?),NOW(),?)';
                connection.query(query,[transactionID,reporterID,reportedID,reportType,comment],function(error,result){
                    if(error){
                        res.send(error);
                        console.log(error);
                    }
                    res.json(result);
                }); 
            }
        })
    }
})

module.exports = router;