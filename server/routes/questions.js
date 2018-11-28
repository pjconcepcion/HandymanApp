var db = require('../connection');
var connection = db.connection();

var express = require('express');
var router = express.Router();

router.get('/questions/', function(req,res){
    var query = 'SELECT questionID,question AS value FROM question WHERE FLAG = 1';
    var sql = connection.query(query,function(error,results){       
        if(error){
            res.send(error);
        }          
        res.json(results);
    });    
});

router.get('/questions/:username', function(req,res){
    var username = req.params.username;  
    var query = 'SELECT fp.questionID,question,answer,fp.userID FROM forgotpassword fp ' +
            'INNER JOIN users u ON fp.userID = u.userID ' +
            'INNER JOIN question q ON q.questionID = fp.questionID ' +
            'WHERE u.email = ? OR fp.userID = ?';
    var sql = connection.query(query,[username,username],function(error,results){       
        if(error){;
            res.send(error);
        }else{
            res.json(results[0]);
        }          
    });    
});

router.post('/questions/:userID', function(req,res){
    var userID = req.params.userID;
    var questionID = req.body.value.question;
    var answer = req.body.value.answer;
    var query = 'UPDATE forgotpassword SET questionID = ?,answer = ? WHERE userID = ?';
    var sql = connection.query(query,[questionID,answer,userID],function(error,result){
        if(error){
            res.status(400);
        }
        res.json(result);
    })
    console.log(sql.sql);
});

module.exports = router;