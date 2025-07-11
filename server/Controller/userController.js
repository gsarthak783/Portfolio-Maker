const {User} = require('../db')
const bcrypt = require('bcryptjs')


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Retrieves all users from the collection
        res.status(200).json({
            message: "All users fetched successfully",
            payload: users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
};


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
    
  try{
    let {uid} = req.body
    console.log(uid);
    
    const deletedUser = await User.findOneAndDelete({ uid });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", payload: deletedUser });
  }
  
   catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }

}
module.exports = {getAllUsers,getData,postData, deleteData, verifyEmail}