const express = require('express');

const startDB = require('../db/firebase');

const getAdminDB = fn => (...args) => fn([...args, startDB.db]);

const router = express.Router();

// router.get('/delete-apartments', getAdminDB(deleteAps));

module.exports = router; // exporting router so that it can be used in app.js
