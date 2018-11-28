var db = require('../connection');
var connection = db.connection();

var express = require('express');
var router = express.Router();

router.get('/login', function(req,res){
    var email = req.query.username;     
    var password = req.query.password;
    var query = 'SELECT userID,Type FROM users WHERE email = ? AND password = ? AND FLAG = 1';
    var sql = connection.query(query,[email,password],function(error,results){  
        if(error){ 
            res.send(error);
        }else{
            if(results.length != 0){                
                var userData = results[0];
                var userID = userData.userID
                query = "UPDATE users SET lastLogin = NOW() WHERE userID = ?";
                connection.query(query,[userID],function(error,results){
                    if(error){
                        res.send(error);
                    }else{                  
                        res.json(userData);
                    }
                });
            }else{
                res.json(false);
            }
        }          

    });   
});

module.exports = router;