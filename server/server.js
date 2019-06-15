const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

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

    socket.emit('newMessage', {
        from: "Ali",
        text: 'wellcome to Chat app.'
    });

    socket.broadcast.emit('newMessage', {
        from: "َAli",
        text: "Amin I Love you.",
        created: new Date().getTime()
    });

    socket.on('createMessage', (message) => {

        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     created: new Date().getTime()
        // });


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
