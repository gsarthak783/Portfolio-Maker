const { Education, User, PersonalInfo } = require('../db');

// Get Personal Info data by email
const getData = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email }, "resume.personalInfo");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({
            message: "Personal Info fetched successfully",
            payload: user.resume?.personalInfo || {}
        });
    } catch (error) {
        console.error("Error fetching personal info:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


// Add/Update Personal Info to the user’s resume
const postData = async (req, res) => {
    const { email, data } = req.body;

    if (!email || !data) {
        return res.status(400).json({ error: "Email and data are required" });
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { "resume.personalInfo": data } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({
            message: "Personal Info updated successfully",
            payload: updatedUser.resume.personalInfo
        });
    } catch (error) {
        console.error("Error updating Personal Info:", error);
        return res.status(500).json({ error: "Internal server error" });
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
