const {Project, User} = require('../db')

const getData = async (req,res) => {

    // let data = await Project.find();
    // res.send({message:'Project data', payload:data});

    let {email} = req.params
    
    const user = await User.findOne({ email }, "resume.footerLinks");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
     
    res.send({message:'Footer data', payload:user.resume.footerLinks});
}

const postData = async (req,res) => {
    let {email, data} = req.body

    // let result = await Project.create(data);
    // res.status(201).send({message:'Footer data created',payload:{data,email}})

    try {
    
        // Ensure footerLinks is not empty
        if (!data || Object.keys(data).length === 0) {
          return res.status(400).json({ message: "No valid links to update." });
        }
    
        // Update the provided fields in footerLinks
        const result = await User.updateOne(
          { email },
          { $set: Object.fromEntries(
              Object.entries(data).map(([key, value]) => [`resume.footerLinks.${key}`, value])
            )
          }
        );
    
        if (result.nModified === 0) {
          return res.status(404).json({ message: "User not found or no changes made." });
        }
    
        res.status(200).json({ message: "Footer links updated successfully.",payload:result });
      } catch (error) {
        res.status(500).json({ message: "An error occurred.", error });
      }
}


module.exports = {getData,postData}