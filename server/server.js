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
const project = require('./Api/projectApi')
app.use('/experience', experience)
app.use('/project',project)

let port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
