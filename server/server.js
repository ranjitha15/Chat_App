const path = require('path');
const http = require('http');
const express = require('express'); // to set up http server
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8080;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    console.log("New user connected");


    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback("Name and room name are required");
        }
        socket.join(params.room); //Join a particular room
        //--Welcome message from admin to the new user--//
            socket.emit('newMessage',generateMessage('Admin',"Welcome to the Chat room"));

        //--Informing other users that a new user has joined--//
            socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
        callback();
    });
//--Standard Event Listener--//
    socket.on('createMessage',(message,callback)=>{
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback();

    });

//--Geolocation--//

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
    });

    socket.on('disconnect',()=>{
        console.log("User was disconnected");
    });
});

server.listen(port,function(){
    console.log(`Server is up on ${port}`);
});
