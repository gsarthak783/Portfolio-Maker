const express = require('express');
const email = express.Router();

const expressAsyncHandler = require('express-async-handler');
const { sendEmail } = require('../Controller/emailController');
 

email.post('/send-email',expressAsyncHandler(sendEmail))


module.exports = email;