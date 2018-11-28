var db = require('../connection');
var connection = db.connection();

var express = require('express');
var router = express.Router();

router.get('/bookings', function(req,res,next){
    connection.query('SELECT * FROM users',function(error,results){        
        if(error){
            res.send(error);
        }
        res.json(results);
    });    
});

router.post('/bookings',function(req,res,next){
    var bookings = req.body.data;
    if(!bookings.customerID){
        res.status(400);
        res.json({
            error: 'Bad Data'
        });
    }else{
        var customerID = bookings.customerID;
        var serviceID = bookings.serviceID;
        var choices = bookings.choices;
        var amount = bookings.fare;
        var remarks = bookings.remarks;
        var query = 'INSERT INTO booking (customerID,serviceID,groupChoicesID,date,amount,remarks) ' +
            "VALUES (?,?,CONCAT(?,DATE_FORMAT(NOW(),'%y%c%d%h%i%S')),NOW(),?,?)";
        connection.query(query,[customerID,serviceID,customerID,amount,remarks],function(error,results){
            if(error){
                res.send('Booking Transaction: ' + error)
            }
            var bookingID = results.insertId;
            var query = 'SELECT groupChoicesID FROM booking WHERE bookingID = ?';
            connection.query(query,[bookingID],function(error,results){
                if(error){
                    res.send('SELECT GroupChoicesId: ' + error)
                }else{
                    var groupChoicesID = results[0].groupChoicesID;
                    var query = 'INSERT INTO selected (choicesID,description,groupChoicesID) VALUES (?,?,?)';
                    var success = true;
                    if(typeof choices.id === 'object'){
                        for(var ctr = 0;ctr<choices.id.length;ctr++){
                            var choicesID = choices.id[ctr];
                            var description = choices.description[ctr];
                            connection.query(query,[choicesID,description,groupChoicesID],function(error,result){
                                if(error){
                                    console.log('INSERT ERROR: ' + error);
                                    success = false;
                                }
                            })
                        }
                    }else{
                        var choicesID = choices.id;
                        var description = choices.description;
                        connection.query(query,[choicesID,description,groupChoicesID],function(error,result){
                            if(error){
                                console.log('INSERT ERROR: ' + error);
                                success = false;
                            }
                        })
                    }

                    if(success){
                        res.json(bookingID);
                    }
                }
            })
        })
    }
})

router.post('/bookings/:bookingID',function(req,res){
    var bookingID = req.params.bookingID;
    var bookings = req.body.data;
    if(!bookings.customerID){
        res.status(400);
        res.json({
            error: 'Bad Data'
        });
    }else{
        var handymanID = bookings.handymanID;
        var query = 'INSERT INTO transaction (bookingID,handymanID) ' +
            "VALUES (?,?)";
        connection.query(query,[bookingID,handymanID],function(error,results){
            if(error){
                res.send('Booking Transaction: ' + error)
            }
            res.json(results.insertId);
        })
    }
})

router.post('/bookings/service/:bookingID',function(req,res,next){
    var bookingID = req.params.bookingID;
    var type = req.body.type;
    if(type == 'accept'){
        var timeStart = req.body.timeStarted;
        var timeEnd = req.body.timeEnded;
        var query = 'UPDATE transaction SET timeIn = ?,timeOut = ? WHERE bookingID = ?';
        connection.query(query,[timeStart,timeEnd,bookingID],function(error,results){
            if(error){
                res.send('Accepted Transaction: ' + error);
            }
            res.json(results);
        });
    }
    else if(type == 'cancel'){
        var userID = req.body.userID;
        var userType = req.body.userType;        
        var query = 'SELECT amount from booking WHERE bookingID = ?';
        connection.query(query,[bookingID],function(error,results){
            if(error){
                res.send('Select amount: ' + error);
            }
            var amount = 0;
            if(userType == 2){
                amount = (results[0].amount * .15);
            }else{
                amount = (results[0].amount * .20);
            }
            var query = 'INSERT penalty (userID,amount,date) VALUES (?,?,DATE(NOW()))';
            connection.query(query,[userID,amount],function(error,results){
                if(error){
                    res.send('Insert Penalty: ' + error);
                }
                var query = 'UPDATE transaction SET status = 0 WHERE bookingID = ?';
                connection.query(query,[bookingID],function(error,results){
                    if(error){
                        res.send('Update Transaction: ' + errpr);
                    }
                    var query = 'UPDATE users SET count_cancelled = count_cancelled + 1 WHERE userID = ?';
                    connection.query(query,[userID],function(error,results){
                        if(error){
                            res.send(error);
                        }
                        res.json(results);
                    })
                });
            });
        });
    }
    else if(type == 'cancelTransaction'){
        var userID = req.body.userID;
        var userType = req.body.userType;        
        var query = 'SELECT amount from booking WHERE bookingID = ?';
        connection.query(query,[bookingID],function(error,results){
            if(error){
                res.send('Select amount: ' + error);
            }
            var amount = 0;
            if(userType == 2){
                amount = (results[0].amount * .15);
            }else{
                amount = (results[0].amount * .20);
            }
            var query = 'INSERT penalty (userID,amount,date) VALUES (?,?,DATE(NOW()))';
            connection.query(query,[userID,amount],function(error,results){
                if(error){
                    res.send('Insert Penalty: ' + error);
                }
                var timeStart = req.body.timeStarted;
                var timeEnd = req.body.timeEnded;
                var query = 'UPDATE transaction SET timeIn = ?,timeOut = ?,status = 0 WHERE bookingID = ?';
                connection.query(query,[timeStart,timeEnd,bookingID],function(error,results){
                    if(error){
                        res.send('Cancel Service Transaction: ' + error);
                    }
                    var query = 'UPDATE users SET count_cancelled = count_cancelled + 1 WHERE userID = ?';
                    connection.query(query,[userID],function(error,results){
                        if(error){
                            res.send(error);
                        }
                        res.json(results);
                    })
                });
            });
        });
    }
})

router.get('/bookings/:bookingID',function(req,res,next){
    var bookingID = req.params.bookingID;
    var query = "SELECT * FROM booking b INNER JOIN transaction t ON b.bookingID = t.bookingID WHERE b.bookingID = ? ";
    connection.query(query,[bookingID],function(error,result){
        if(error){
            res.send(error);
        }
        res.json(result[0]);
    })
})
module.exports = router;