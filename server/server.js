const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'api health check' });
});

// listen for requests
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening for request on port: ${port}`);
});