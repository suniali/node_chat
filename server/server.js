const path = require('path');
const express = require('express');

const app = express();
const port = process.env.Port || 3000;
const publicPath = path.join(__dirname, '../public');

console.log(publicPath);

app.listen(port, () => {
    console.log('Server Comes up at Port ', port);
});
