var socket = io();

function scrollToBottom() {
    var messages = jQuery('#message');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrolHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHight = newMessage.prev().innerHeight();

    // console.log('clientHeight : ', clientHeight);
    // console.log('scrolTop : ', scrollTop);
    // console.log('scrolHeight : ', scrolHeight);
    // console.log('newMessageHeight : ', newMessageHeight);
    // console.log('lastMessageHeight : ', lastMessageHight);


    if (clientHeight + scrollTop + newMessageHeight + lastMessageHight >= scrolHeight) {
        messages.scrollTop(scrolHeight);
    }
}

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
    // var a = jQuery('<a target="_blank">My Current Location</a>');
    var formatedTime = moment(message.createAt).format('h:mm a');

    li.text(formatedTime + " " + message.from + " : " + message.text);
    // a.attr('href', 'http://www.google.com');
    // li.append(a);
    jQuery('#message').append(li);
    scrollToBottom();
});

socket.emit('createMessage', {
    from: "Amin",
    text: "I Love You Jarvis."
}, function (data) {
    console.log('Got it.', data);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = jQuery("[name='message'");

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function (data) {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location').on('click', function () {
    if (!navigator.geolocation) {
        alert('Location technology is not suported by this browser!');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        console.log('Uncable to fetch location.');
        locationButton.removeAttr('disabled').text('Send Location');
    });
});