const express = require('express');
const personal = express.Router();
const expressAsyncHandler = require('express-async-handler');
const { getData, postData } = require('../Controller/personalInfoController');

personal.get('/get-data/:email', expressAsyncHandler(getData));

personal.post('/post-data', expressAsyncHandler(postData));

module.exports = personal;
