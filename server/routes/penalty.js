var db = require('../connection');
var connection = db.connection();

var express = require('express');
var router = express.Router();

router.get('/penalty/:userID', function(req,res){
    var userID = req.params.userID;
    var query = 'SELECT COALESCE(SUM(amount),0) as amount FROM penalty WHERE status = 0 AND userID = ?';
    var sql = connection.query(query,[userID],function(error,results){       
        if(error){
            res.send(error);
        }          
        res.json(results[0]);
    });    
});

router.post('/penalty/:userID', function(req,res){
    var userID = req.params.userID;
    var query = 'UPDATE penalty SET status = 1 WHERE userID = ?';
    var sql = connection.query(query,[userID],function(error,results){       
        if(error){
            res.send(error);
        }        
        res.json(results);
    });    
})
module.exports = router;