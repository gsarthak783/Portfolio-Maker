const express = require('express');
const education = express.Router();
const expressAsyncHandler = require('express-async-handler');
const { getData, postData, deleteData } = require('../Controller/educationController');

education.get('/get-data/:email', expressAsyncHandler(getData));

education.post('/post-data', expressAsyncHandler(postData));

education.post('/delete-data', expressAsyncHandler(deleteData));

module.exports = education;
