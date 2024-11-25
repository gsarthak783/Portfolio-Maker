const express = require('express')
const user = express.Router();
const expressAsyncHandler = require('express-async-handler');
const { getData, postData, deleteData } = require('../Controller/userController');
 

user.get('/get-data/:email',expressAsyncHandler(getData))

user.post('/post-data',expressAsyncHandler(postData))

user.post('/delete-data',expressAsyncHandler(deleteData))

module.exports = user;