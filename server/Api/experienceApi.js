const express = require('express')
const experience = express.Router();
const expressAsyncHandler = require('express-async-handler');
const { getData, postData, deleteData } = require('../Controller/experienceController');
 

experience.get('/get-data',expressAsyncHandler(getData))

experience.post('/post-data',expressAsyncHandler(postData))

experience.post('/delete-data',expressAsyncHandler(deleteData))

module.exports = experience;