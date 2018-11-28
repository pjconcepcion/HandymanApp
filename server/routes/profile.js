var db = require('../connection');
var connection = db.connection();

var express = require('express');
var router = express.Router();

router.get('/profile/:userID', function(req,res){
    var userID = req.params.userID;  
    var query = 'SELECT *, ' +
        'DATE_FORMAT(birthDate,\'%M %d, %Y\') AS birthDay, (YEAR(NOW()) - YEAR(birthDate)) AS age,' +
        'DATE_FORMAT(birthDate,\'%Y-%m-%d\') AS birthDate ' +
        'FROM users u INNER JOIN address a ON u.addressID = a.addressID WHERE userID = ? AND FLAG = 1';
    var sql = connection.query(query,[userID],function(error,results){       
        if(error){
            res.send(error);
        }          
        res.json(results[0]);
    });    
});

router.get('/profile/handyman/:userID', function(req,res){
    var userID = req.params.userID;  
    var query = 'SELECT *,(SELECT COALESCE(AVG(rating),0) FROM feedback WHERE userID = ?) as rating, ' +
        'DATE_FORMAT(birthDate,\'%M %d, %Y\') AS birthDay,(YEAR(NOW()) - YEAR(birthDate)) AS age, ' +
        'DATE_FORMAT(birthDate,\'%Y-%m-%d\') AS birthDate ' +
        'FROM users u ' +
        'INNER JOIN address a ON u.addressID = a.addressID '+
        'WHERE u.userID = ? AND flag = 1 AND verifiedFlag = 1 ' 
    var sql = connection.query(query,[userID,userID],function(error,results){       
        if(error){
            res.send(error);
        }          
        res.json(results[0]);
    });    
});

router.post('/profile/:userID',function(req,res){    
    var userID = req.params.userID;
    var editType = req.body.type == 'name'? '': req.body.type + ' = ';
    var editValue = req.body.value; 
    var query = '';
    if(req.body.type == 'address'){
        query = 'UPDATE address SET ? WHERE addressID = ?';
    }
    else if(req.body.type == 'contactPerson'){
        query = 'UPDATE users SET ? WHERE userID = ?';
    }
    else{
        query = 'UPDATE users SET '+ editType + ' ? WHERE  userID = ?';
    }
    
    var sql = connection.query(query,[editValue,userID],function(error,results){
        if(error){
            res.status(400);            
        }        
        res.json(results);
    });
    console.log(sql.sql);
    
})

module.exports = router;