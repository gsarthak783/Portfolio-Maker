const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.json({message:'Hi There!'})
})
const experience = require('./Api/experienceApi')
app.use('/experience', experience)

let port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
