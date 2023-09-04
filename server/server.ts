const express1 = require('express');
const cors = require('cors');
const app = express1();

const route = require('./routes/routes');

app.use(cors()); // Enable CORS for all routes

app.use('/', route);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});