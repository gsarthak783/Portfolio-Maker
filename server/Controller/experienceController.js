const {Experience} = require('../db')

const getData = async (req,res) => {

    
    let data = await Experience.find();
    res.send({message:'Experience data', payload:data});
}

const postData = async (req,res) => {
    let data = req.body

    let result = await Experience.create(data);
    res.status(201).send({message:'Experience data created',payload:result})
}

const deleteData = async (req,res) => { 
    let id = req.body.id
    console.log(id);

    const deletedExperience = await Experience.findByIdAndDelete(id);

    res.status(200).send({ message: 'Experience deleted successfully', payload: deletedExperience });

}
module.exports = {getData,postData, deleteData}