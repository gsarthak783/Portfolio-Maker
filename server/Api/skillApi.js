const express = require('express');
const skill = express.Router();
const expressAsyncHandler = require('express-async-handler');
const { getData, postData, deleteData } = require('../Controller/skillController');

skill.get('/get-data/:email', expressAsyncHandler(getData));

skill.post('/post-data', expressAsyncHandler(postData));

skill.post('/delete-data', expressAsyncHandler(deleteData));

module.exports = skill;
