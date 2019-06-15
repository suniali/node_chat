const expect = require('expect');

var { generateMessage } = require('./message');

describe('GenerateMessage', () => {
    it('test generate currect message object', () => {
        var from = "Amin";
        var text = "I Love you Amin";
        var message = generateMessage(from, text);

        expect(message).toMatchObject({ from, text });
    });
});