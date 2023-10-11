const express = require('express');
const router = express.Router();

const log = require('../controllers/logController');

// route handler for getting and parsing logs
router.get('/api/logs', log.parseLogs, (req, res) => {
    console.log('/logs GET request has fired!');
    res.status(200).json(res.locals.data);
});

module.exports = router;