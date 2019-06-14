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

    socket.on('disconnect', () => {
        console.log('Server disconnected.');
    });
});




server.listen(port, () => {
    console.log('Server Comes up at Port ', port);
});
