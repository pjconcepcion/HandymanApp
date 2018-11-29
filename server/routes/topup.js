var db = require('../connection');
var connection = db.connection();
var mailgun = require('mailgun-js')({
    apiKey: '',
    domain: ''});

var express = require('express');
var router = express.Router();

router.post('/topup', function(req,res){
    var userID = req.body.userID;
    var email = req.body.email;
    var value = req.body.value;
    let data = {
        from: '"Find and Hire" <findandhirehandyman@gmail.com>', 
        to: email, 
        subject: 'Top-up Request', 
        text: 'You requested for ' + value + '\n' +
            'Mode of payment:\n' +
            '1. If you selected - LBC Pera Padala:\n' + 
            '\tYou can visit any LBC or Palawan Express branch and make a remittance. Details below: \n' +
            '\t\t Name: Jlord Tolentino \n' +
            '\t\t LBC Card Loading Number: 123456789 (for LBC Payment only) \n' +
            '\t\t Address: DOST, Taguig City \n' +
            '\t\t Contact Number: 09586587159 \n\n' +
            '2. If you selected - Bank Deposit:\n' + 
            '\tYou can deposit your payment at our bank accounts in BDO. Details below: \n' +
            '\t\t Account Name: Jlord Tolentino \n' +
            '\t\t Bank: BDO \n' +
            '\t\t Account Number: 00123-4567-890\n' +
            '\t\t Account Type: Savings \n\n' +
            'Once done with payment, please write your name on the deposit or remittance slip, scan it or photograph it\n' +
            'Steps on Uploading: \n' +
            '1. Go to our website. \n' +
            '2. Login you account. \n' +
            '3. On left sidebar, go to history > topup. \n' +
            '4. Click "browse" then select your deposit/remittance slip. \n' +
            '5. Click "upload" then wait for verification.' 
    };

    mailgun.messages().send(data,function(error,body){
        if(!error){
            var query = 'INSERT into topuphistory (userID,value,date) VALUES (?,?,NOW())';
            connection.query(query,[userID,value],function(error,results){        
                if(error){
                    res.send(error);
                }else{
                    res.json(results)
                } 
            })
        }else{
            console.log(error); 
        }    
    })
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



module.exports = router;
