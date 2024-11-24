const {Project} = require('../db')

const getData = async (req,res) => {

    
    let data = await Project.find();
    res.send({message:'Project data', payload:data});
}

const postData = async (req,res) => {
    let data = req.body

    let result = await Project.create(data);
    res.status(201).send({message:'Project data created',payload:result})
}

const deleteData = async (req,res) => { 
    let id = req.body.id
    console.log(id);

    const deletedProject = await Project.findByIdAndDelete(id);

    res.status(200).send({ message: 'Project deleted successfully', payload: deletedProject });

}
module.exports = {getData,postData, deleteData}