const { Education, User, PersonalInfo } = require('../db');

// Get Personal Info data by email
const getData = async (req, res) => {
    let { email } = req.params;

    const user = await User.findOne({ email }, "resume.personalInfo");

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.send({ message: 'Personal Info data', payload: user.resume.personalInfo });
};

// Add/Update Personal Info to the user’s resume
const postData = async (req, res) => {
    let { email, data } = req.body;
    console.log("Received data:", req.body);

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $push: { "resume.personalInfo": data } },
            { new: true, runValidators: true }
        );

        if (updatedUser) {
            res.status(201).send({ message: 'Personal Info added successfully', payload: updatedUser });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error adding Personal Info:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a info by ID
// const deleteData = async (req, res) => {
//     let _id = req.body._id;
//     console.log("Received ID for deletion:", _id, req.body);

//     try {
//         const deletedEducation = await PersonalInfo.findByIdAndDelete(_id);

//         if (!deletedEducation) {
//             return res.status(404).json({ error: "Education detail not found" });
//         }

//         res.status(200).send({ message: 'Education detail deleted successfully', payload: deletedEducation });
//     } catch (error) {
//         console.error("Error deleting education detail:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

module.exports = { getData, postData };
