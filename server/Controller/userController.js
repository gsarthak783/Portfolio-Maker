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

const verifyEmail = async (req, res) => {
  try {
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ message: "UID is required" });
    }

    // Find the user
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(200).json({ message: "User already verified", body:user });
    }

    // Update the user
    user.isVerified = true;
   const updated =  await user.save();

    return res.status(200).json({ success:true ,message: "Email successfully verified", body:updated });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteData = async (req,res) => { 
    let id = req.body.id
    console.log(id);
    
    const deletedProject = await User.findByIdAndDelete(id);

    res.status(200).send({ message: 'User deleted successfully', payload: deletedProject });

}
module.exports = {getData,postData, deleteData, verifyEmail}