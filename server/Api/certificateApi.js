const express = require('express');
const certificate = express.Router();
const expressAsyncHandler = require('express-async-handler');
const { getData, postData, deleteData } = require('../Controller/certificateController');

certificate.get('/get-data/:email', expressAsyncHandler(getData));

certificate.post('/post-data', expressAsyncHandler(postData));

certificate.post('/delete-data', expressAsyncHandler(deleteData));

module.exports = certificate;
