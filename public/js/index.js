var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server.');
});

socket.on('disconnect', function () {
    console.log('Disconnected from Server.');
});

socket.on('newEmail', function (email) {
    console.log('New Email recived.\n', email);
});

socket.on('newMessage', function (message) {
    console.log('new Message', message);
});