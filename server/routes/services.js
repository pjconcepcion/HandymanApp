var db = require('../connection');
var connection = db.connection();

var express = require('express');
var router = express.Router();

router.get('/services', function(req,res){
    var query = 'SELECT name AS value,amount,serviceID FROM services WHERE flag = 1';
    connection.query(query,function(error,results){        
        if(error){
            res.send(error);
        }          
        res.json(results);
    });    
});

router.get('/services/:userID', function(req,res){
    var userID = req.params.userID;
    var query = 'SELECT s.name FROM handymanservice hs INNER JOIN services s ON hs.serviceID = s.serviceID ' +
        'WHERE handymanID = ?';
    connection.query(query,[userID],function(error,results){        
        if(error){
            res.send(error);
        }          
        res.json(results);
    });    
});

router.get('/services/form/:service', function(req,res){
    var service = req.params.service;
    var query = 'SELECT FormChoicesID as ID,title,description,component,amount,unit FROM form f ' +
            'INNER JOIN formchoices fc ON f.formID = fc.formID ' +          
            'WHERE serviceID = ? AND flag = 1';
    var sql = connection.query(query,[service],function(error,results){        
        if(error){
            res.send(error);
        }          
        res.json(results);
    });    
});


module.exports = router;
