var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./connection');

db.connect();

var index = require('./routes/index');
var login = require('./routes/login');
var bookings = require('./routes/bookings');
var profile = require('./routes/profile');
var notification = require('./routes/notification');
var transaction = require('./routes/transaction');
var services = require('./routes/services');
var questions = require('./routes/questions');
var newAccount = require('./routes/newAccount');
var options = require('./routes/options');
var reports = require('./routes/reports');
var feedback = require('./routes/feedback');
var penalty = require('./routes/penalty');
var upload = require('./routes/upload');
var toptup = require('./routes/topup');
var points = require('./routes/points');

var app = express();
var port = process.env.PORT || 4006;

var socket_io = require('socket.io');
var io = socket_io();

var online = [];
var connected = 0;

//--- Body Parser ---
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//--- Routes ----
app.use('/', index);
app.use('/api',login);
app.use('/api',bookings);
app.use('/api',profile);
app.use('/api',notification);
app.use('/api',transaction);
app.use('/api',services);
app.use('/api',questions);
app.use('/api',newAccount);
app.use('/api',options);
app.use('/api',reports);
app.use('/api',feedback);
app.use('/api',penalty);
app.use('/api',upload);
app.use('/api',toptup);
app.use('/api',points);

io.listen(app.listen(port,function(){
    console.log('Server is on port', port);
}));

io.on('connection',function(socket){  

    socket.on('login', (data) => {
        online.push({socketID: socket.id,userID: data.userID, userType: data.userType});
        if(data.userType == 2){
            socket.join('handymanRoom', () => {
                console.log('user join on handyman');
            });
        }else{
            socket.join('customerRoom', () => {
                console.log('user join on customer');
            });
        }
        connected++;
        console.log('User ' + data.userID + ' is connected with socket id of ' + socket.id);
        console.log('Number of connected user/s: ' + connected);
    });

    socket.on('disconnect', () => {
        for(ctr = 0;ctr<online.length-1;ctr++){
            if(online[ctr].socketID == socket.id){
                online.splice(ctr,1);
            }
        }
        console.log(socket.id + ' has disconnected');
    })

    socket.on('book', (data) => {     
        data['socketID'] = socket.id;           
        var room = data.service;
        for(var ctr = 0;ctr<online.length;ctr++){
            if(online[ctr].userType == 2){
                if(!online[ctr].joined){
                    var handymanLat = online[ctr].handymanRegion.latitude;
                    var handymanLong = online[ctr].handymanRegion.longitude;
                    var customerLat = data.region.latitude;
                    var customerLong = data.region.longitude;
                    var radLat1 = Math.PI * handymanLat/180;
                    var radLat2 = Math.PI * customerLat/180;
                    var theta = handymanLong - customerLong;
                    var radTheta = Math.PI * theta/180;
                    var distance = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);

                    if(distance > 1){
                        distance = 1;
                    }

                    distance = Math.acos(distance);
                    distance = distance * 180/Math.PI;
                    distance = distance * 60 * 1.1515;
                    distance = (distance * 1.609344)/0.0010000;

                    if(distance < 500){
                        if(online[ctr].rooms){
                            for(var roomCtr = 0;roomCtr < online[ctr].rooms.length; roomCtr++){
                                if(online[ctr].rooms[roomCtr] == room){
                                    online[ctr].joined = socket.id;
                                    socket.to(online[ctr].socketID).emit('bookRequest',data);
                                }
                            }
                        }
                    }
                }
            }
            if(online[ctr].socketID == socket.id){
                online[ctr].region = data.region;
            }
        }    
    });

    socket.on('cancelRequest', () => {
        for(var ctr = 0;ctr<online.length;ctr++){                  
            if(online[ctr].userType == 2){
                if(online[ctr].joined == socket.id){
                    online[ctr].joined = '';
                    socket.to(online[ctr].socketID).emit('cancelToHandyman');
                }
                if(online[ctr].socketID == socket.id){
                    online[ctr].rooms.map((item) => {
                        socket.leave(item, () => {
                            console.log('Socket ID ' + socket.id + ' left on ' + item);
                        })
                    })
                    io.emit('action',{
                        type: 'REMOVE_HANDYMAN',
                        socket: socket.id
                    })
                    break;
                }
            }
        }
    })

    socket.on('cancelTransaction',(data) => {
        io.to(data.userSocket).emit('reasonMessage',(data));
        socket.emit('endTransaction',data)
    });

    socket.on('cancelBookRequest', (socketID) => {
        for(var ctr = 0;ctr<online.length;ctr++){
            if(online[ctr].userType == 2){
                if(online[ctr].joined == socketID){
                    online[ctr].joined = '';
                    socket.emit('cancelBookRequest');
                }
            }
        }
    });

    socket.on('find', (data) => {
        online.map((item,index) => {
            if(item.socketID == socket.id){   
                online[index].handymanRegion = data.region;
                console.log(online[index].handymanRegion)
                var newData = {region: data.region, socket: socket.id};       
                io.emit('action',{
                    type: 'GET_NEARBY_HANDYMAN',
                    newData
                });
                online[index].rooms = data.services;
            }
        })
    });

    socket.on('acceptRequest', (data) => {  
        for(var ctr = 0; ctr < online.length; ctr++){
            if(online[ctr].userType == 2){
                if(online[ctr].socketID != socket.id){
                    if(online[ctr].joined == data.socketID){
                        socket.to(online[ctr].socketID).emit('cancelToHandyman');
                    }
                }
                if(online[ctr].socketID == socket.id){
                    data['handymanID'] = online[ctr].userID;
                    data['handymanRegion'] = online[ctr].handymanRegion;
                }
            }
        }   
        
        data['handymanSocket'] = socket.id;
        data['customerRegion'] = data.region;
        data['customerSocket'] = data.socketID; 
        data['roomSocket'] = data.socketID + '-'+ data.bookingID,
        socket.to(data.socketID).emit('accepted',{
            userID: data.handymanID,
            userType: 2,
            roomSocket: data.socketID + '-'+ data.bookingID,
            data,
        });
        socket.emit('accepted',{
            userID: data.customerID,
            userType: 1,
            roomSocket: data.socketID + '-'+ data.bookingID,
            data
        });

    });

    socket.on('joinChatRoom',(data) => {
        socket.join(data.roomSocket,() => {
            console.log('SocketID: ' + socket.id + ' join room socket ' + data.roomSocket);
            socket.emit('joinedUsers',data);
        });
    });

    socket.on('messageUser',(data) => {
        socket.to(data.roomSocket).emit('action',{
            type: 'READ_MESSAGE',
            isMessageRead: true,
        })
        socket.to(data.roomSocket).emit('newMessage',data.message);
    });

    socket.on('newMessageRead', () => {
        io.emit('action',{
            type: 'READ_MESSAGE',
            isMessageRead: false,
        })
    });

    socket.on('handymanArrived',(data) => {        
        io.in(data.roomSocket).emit('serviceStart',data);
    });

    socket.on('serviceFinish',(data) => {
        io.in(data.roomSocket).emit('endTransaction',data);
    })

    socket.on('serviceCancel',(data) => {
        data.serviceCancel = true;
        io.in(data.roomSocket).emit('serviceCancel',data);
    })

    socket.on('leaveRoom',(data) =>{
        var pop = '';
        for(var ctr = 0;ctr<online.length;ctr++){
            if(online[ctr].userType == 2){
                if(online[ctr].socketID == socket.id){ 
                    online[ctr].joined = '';   
                    online[ctr].rooms = [];                
                    io.emit('action',{
                        type: 'REMOVE_HANDYMAN',
                        socket: socket.id
                    })
                    pop = 'handymanUI' ;
                    break;
                }
            }else{
                if(online[ctr].socketID == socket.id){
                    pop = 'customerUI';
                    data.userID = online[ctr].userID;
                    break;
                }
            }
        }
        socket.leave(data.roomSocket,()=>{
            console.log('SocketID: ' + socket.id + ' left on room socket ' + data.roomSocket);
        });
        if(!data.cancelled){
            socket.emit('giveFeedback',data);
        }else{
            socket.emit('returnRoot',pop);
        }
    });

    socket.on('setHandymanLocation',(data) => {
        io.in(data.roomSocket).emit('sendHandymanRegion',data.position)
    })
})


