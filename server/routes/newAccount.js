var db = require('../connection');
var connection = db.connection();
var mailgun = require('mailgun-js')({
    apiKey: 'f84566c77f4dd36fe428b2dc2d680097-6b60e603-4d721250',
    domain: 'sandbox6ed9d0dc95e54148860e8acf11ccb867.mailgun.org'});

var express = require('express');
var router = express.Router();

router.post('/newAccount',function(req,res,next){
    var firstName = req.body.firstName;    
    var middleName = req.body.middleName;
    var lastName = req.body.lastName;
    var houseNo = req.body.houseNo;
    var street = req.body.street;
    var barangay = req.body.barangay;
    var city = req.body.city;
    var birthDay = req.body.birthDay;
    var emailAddress = req.body.emailAddress;
    var contactNumber = req.body.contactNumber;
    var password = req.body.password;
    var selectedQuestion = req.body.selectedQuestion;
    var answer = req.body.answer;
    let query = 'INSERT INTO address (houseNo,street,barangay,city) ' +
            'VALUES(?,?,?,?)'
    connection.query(query,[houseNo,street,barangay,city], function(error,results){
        if(error){
            res.send('Transaction: '  + error);
        }else{
            let addressID = results.insertId;
            let query = 'INSERT INTO users ' +
                '(firstName,middleName,lastName,addressID,birthDate,email,contact,password,type) ' +
                'VALUES(?,?,?,?,?,?,?,?,1)';
            connection.query(query,
                [firstName,middleName,lastName,addressID,birthDay,emailAddress,contactNumber,password],
                function(error,results){
                    if(error){
                        console.log('New Account user' + error);
                    }else{
                        var userID = results.insertId;
                        let query = "SELECT questionID from question WHERE question = ?";
                        connection.query(query,[selectedQuestion],function(error,results){
                            if(error){
                                console.log('New account question' + error);
                            }else{
                                let questionID = results[0].questionID;
                                let query = 'INSERT INTO forgotpassword (questionID,userID,answer) ' +
                                    'VALUES (?,?,?)';
                                connection.query(query,[questionID,userID,answer],function(error,results){
                                    if(error){
                                        console.log('New account forgot password' + error);
                                    }else{
                                        console.log('Successfully created user ' + userID);
                                        res.send(results);
                                    }
                                });
                            }
                        });
                    }
                });
        }
    });
})

module.exports = router;