const {Project, User} = require('../db')

const getData = async (req,res) => {

    // let data = await Project.find();
    // res.send({message:'Project data', payload:data});

    let {email} = req.params
    
    const user = await User.findOne({ email }, "resume.projects");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
     
    res.send({message:'Project data', payload:user.resume.projects});
}

const postData = async (req,res) => {
    let {email, data} = req.body

    // let result = await Project.create(data);
    // res.status(201).send({message:'Project data created',payload:result})

    try {
        const updatedUser = await User.findOneAndUpdate(
          { email }, // Match the user by email
          { $push: { "resume.projects": data } }, // Push the experience to the array
          { new: true, runValidators: true } // Return the updated document and validate the input
        );
        if (updatedUser) {
            res.status(201).send({message:'Project data Added',payload:updatedUser})
        } else {
          console.log("No user found with this email.");
        }
      } catch (error) {
        console.error("Error adding experience:", error);
      }
}

const deleteData = async (req,res) => { 
    let id = req.body.id
    console.log(id);

    const deletedProject = await Project.findByIdAndDelete(id);

    res.status(200).send({ message: 'Project deleted successfully', payload: deletedProject });

}
module.exports = {getData,postData, deleteData}