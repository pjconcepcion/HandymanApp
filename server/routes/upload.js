var db = require('../connection');
var connection = db.connection();

var express = require('express');
var router = express.Router();

var ftp = require('basic-ftp');
var fs = require('fs');

const client = new ftp.Client();
const dir = 'uploads/images/';
const rdStream = dir + 'x.jpg';
async function ftpServer(img,fileName){
    try{
        await client.access({
            host: 'localhost',
            port: '21',
            user: 'handyman',
            password: 'handyman',
            secure: false,
        })
        await client.ensureDir(dir);
        await client.uploadDir(dir);
        await client.upload(fs.createReadStream(rdStream), img);     
        await client.rename(await client.pwd()+'/'+img,await client.pwd()+'/'+fileName);
        console.log(await client.size(await client.pwd()+'/'+fileName));       
    }catch(error){
        console.log(error);
    }
    client.close();
}

router.post('/upload/:userID', function(req,res){ 
    var file = req.body.value;
    var userID = req.params.userID;
    var imgFile = file.split('/');
    var img = imgFile[imgFile.length-1];
    var imgFormat = img.split('.');
    var fileName = userID +'.'+ imgFormat[1];
    ftpServer(img,fileName).then(() => console.log('Hello'));
});

module.exports = router;