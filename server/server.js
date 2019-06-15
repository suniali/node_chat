const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var { generateMessage } = require('./utils/message');

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

console.log(publicPath);

io.on('connection', (socket) => {
    console.log('New user Connected.');


    socket.emit('newEmail', {
        from: "jarvismatroki@gmail.com",
        to: "amin@gmail.com",
        subject: "feeling",
        text: "I Love You Amin."
    });

    socket.emit('newMessage', generateMessage('Jarvis', "Welcome to Chat app."));

    socket.broadcast.emit('newMessage', generateMessage('Ali Matroki', "I Love You Amin."));

    socket.on('createMessage', (message, callback) => {

        io.emit('newMessage', generateMessage(message.from, message.text));
        callback("This is a  knowledgment");
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     created: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('Server disconnected.');
    });
});




server.listen(port, () => {
    console.log('Server Comes up at Port ', port);
});
