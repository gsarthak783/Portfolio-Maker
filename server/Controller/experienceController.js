const {Experience,User} = require('../db')

const getData = async (req,res) => {
    let {email} = req.params
    
    const user = await User.findOne({ email }, "resume.experiences");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // let data = await Experience.find();
    res.send({message:'Experience data', payload:user.resume.experiences});
}

const postData = async (req,res) => {
    let {email, data} = req.body
    // console.log(email, data)
    // console.log(req.body)
    // let result = await Experience.create(data);
    // res.status(201).send({message:'Experience data created',payload:result})

    try {
        const updatedUser = await User.findOneAndUpdate(
          { email }, // Match the user by email
          { $push: { "resume.experiences": data } }, // Push the experience to the array
          { new: true, runValidators: true } // Return the updated document and validate the input
        );
        if (updatedUser) {
            res.status(201).send({message:'Experience data Added',payload:updatedUser})
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

    const deletedExperience = await Experience.findByIdAndDelete(id);

    res.status(200).send({ message: 'Experience deleted successfully', payload: deletedExperience });

}
module.exports = {getData,postData, deleteData}