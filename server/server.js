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
const user = require('./Api/userApi')
const footer = require('./Api/footerApi')
// const skill = require('./Api/skillApi')
const certificate = require('./Api/certificateApi')
const email = require('./Api/emailAPi')

app.use('/experience', experience)
app.use('/project',project)
app.use('/user',user)
app.use('/footer',footer)
// app.use('/skill',skill)
app.use('/certificate',certificate)
app.use('/email',email)

let port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
