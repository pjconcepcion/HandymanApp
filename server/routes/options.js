var db = require('../connection');
var connection = db.connection();

var express = require('express');
var router = express.Router();

router.get('/options/:type/:name', function(req,res){
    var type = req.params.type;
    var service = req.params.name;
    var query = '';
    if(type == 'service'){        
        var query = 'SELECT description FROM options o INNER JOIN services s ON o.serviceID = s.serviceID ' +
            'WHERE name = ? AND o.flag = 1';
        connection.query(query,[service],function(error,results){        
            if(error){
                res.send(error);
            }          
            res.json(results);
        });    
    }else{        
        var query = 'SELECT amount FROM options WHERE description = ? AND flag = 1';
        connection.query(query,[service],function(error,results){        
            if(error){
                res.send(error);
            }          
            res.json(results[0]);
        });    
    }
    
});

module.exports = router;
