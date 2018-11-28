var db = require('../connection');
var connection = db.connection();

var express = require('express');
var router = express.Router();

router.post('/feedback', function(req,res){
    var feedback = req.body;
    if(!feedback){
        res.status(400);
        res.json({
            error: 'Bad Data'
        });
    }else{
        var transactionID = feedback.transactionID;
        var userID = feedback.userID;
        var rating = feedback.rate;
        var comment = feedback.comment;
        var query = 'INSERT INTO feedback (transactID,userID,comment,rating) ' +
            'VALUES (?,?,?,?)';
        connection.query(query,[transactionID,userID,comment,rating],function(error,results){        
            if(error){
                console.log('Post Feedback' + error);
                res.send(error);
            }          
            var query = 'UPDATE users SET count_cancelled = 0 WHERE userID = ?';
            connection.query(query,[userID],function(error,results){
                if(error){
                    res.send(error);
                }
                res.json(results);
            })
        });  
    }  
});

module.exports = router;