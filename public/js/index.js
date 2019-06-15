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

    var li = jQuery('<li></li>');
    li.text(message.from + " : " + message.text);

    jQuery('#message').append(li);
});

socket.emit('createMessage', {
    from: "Amin",
    text: "I Love You Jarvis."
}, function (data) {
    console.log('Got it.', data);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery("[name='message']").val()
    }, function (data) {
    });
});