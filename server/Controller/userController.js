const {User} = require('../db')
const bcrypt = require('bcryptjs')

const getData = async (req,res) => {

    let email = req.params

    let data = await User.findOne(email);
    if(data){
        res.send({message:'User data', payload:data});
    }
    else{
        res.send({message:'No user found'});

    }
   
}

const postData = async (req,res) => {
    let data = req.body
    let {password,...userData} = data;
    let hashed = await bcrypt.hash(password,10);
    userData.password = hashed;
    let result = await User.create(userData);
    res.status(201).send({message:'User data created',payload:result})
}

const deleteData = async (req,res) => { 
    let id = req.body.id
    console.log(id);
    
    const deletedProject = await User.findByIdAndDelete(id);

    res.status(200).send({ message: 'User deleted successfully', payload: deletedProject });

}
module.exports = {getData,postData, deleteData}