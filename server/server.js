const path = require('path');
const http = require('http');
const express = require('express'); // to set up http server
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    console.log("New user connected");
//--Welcome message from admin to the new user--//
    socket.emit('newMessage',generateMessage('Admin',"Welcome to the Chat room"));

//--Informing other users that a new user has joined--//
    socket.broadcast.emit('newMessage',generateMessage('Admin',"New user has joined"));

//--Standard Event Listener--//
    socket.on('createMessage',(message,callback)=>{
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback("This is from the server");

    });

    socket.on('disconnect',()=>{
        console.log("User was disconnected");
    });
});

server.listen(port,function(){
    console.log(`Server is up on ${port}`);
});
