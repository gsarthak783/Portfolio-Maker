const express = require('express')
const project = express.Router();
const expressAsyncHandler = require('express-async-handler');
const { getData, postData, deleteData } = require('../Controller/projectController');
 

project.get('/get-data/:email',expressAsyncHandler(getData))

project.post('/post-data',expressAsyncHandler(postData))

project.post('/delete-data',expressAsyncHandler(deleteData))

module.exports = project;