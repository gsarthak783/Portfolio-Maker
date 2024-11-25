const express = require('express');
const footer = express.Router();

const expressAsyncHandler = require('express-async-handler');
const { getData, postData, deleteData } = require('../Controller/footerController');
 

footer.get('/get-data/:email',expressAsyncHandler(getData))

footer.post('/post-data',expressAsyncHandler(postData))

footer.post('/delete-data',expressAsyncHandler(deleteData))

module.exports = footer;