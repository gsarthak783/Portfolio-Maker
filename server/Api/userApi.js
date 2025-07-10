const express = require('express')
const user = express.Router();
const expressAsyncHandler = require('express-async-handler');
const {getAllUsers, getData, postData, deleteData, verifyEmail} = require('../Controller/userController');
 
user.get('/get-users',expressAsyncHandler(getAllUsers))

user.get('/get-data/:email',expressAsyncHandler(getData))

user.post('/post-data',expressAsyncHandler(postData))

user.post('/verify-email',expressAsyncHandler(verifyEmail))

user.post('/delete-data',expressAsyncHandler(deleteData))

module.exports = user;