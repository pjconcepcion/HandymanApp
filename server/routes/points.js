var db = require('../connection');
var connection = db.connection();

var express = require('express');
var router = express.Router();

router.get('/points/:userID', function(req,res){
    var userID = req.params.userID;
    var query = 'SELECT * FROM handymanpoints WHERE userID = ?';
    var sql = connection.query(query,[userID],function(error,results){       
        if(error){
            res.send(error);
        }          
        res.json(results[0]);
    });    
});

router.get('/points/topuphistory/:userID',function(req,res){
    var userID = req.params.userID;
    var query = 'SELECT COUNT(*) AS No FROM topuphistory WHERE userID = ? AND status = 0';
    var sql = connection.query(query,[userID],function(error,results){       
        if(error){
            res.send(error);
        }          
        res.json(results[0]);
    });    
});

router.post('/points/:userID', function(req,res){
    var userID = req.params.userID;
    var points = req.body;
    if(!points.transactionID){
        console.log('400');
    }else{
        var transactionID = points.transactionID;
        var ptsDeduc = points.pointsDeduc * .20;
        var points = points.points - ptsDeduc;
        var query = 'INSERT INTO transactionpts (transactionID,userID,pointsdeduction) VALUES (?,?,?)';
        connection.query(query,[transactionID,userID,ptsDeduc],function(error,result){
            if(error){
                console.log('Post points' + error);
                res.send(error);
            }else{
                var query = 'UPDATE handymanpoints SET points = ? WHERE userID = ?';
                connection.query(query,[points,userID],function(error,results){       
                    if(error){
                        console.log(error);
                        res.send(error);
                    }        
                    console.log(results);
                    res.json(results);
                }); 
            } 
        }) 
    }
})
module.exports = router;