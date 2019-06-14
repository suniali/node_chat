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
});

io.on('disconnect', () => {
    console.log('Server disconnected.');
});

server.listen(port, () => {
    console.log('Server Comes up at Port ', port);
});
