const { Education, User } = require('../db');

// Get Education data by email
const getData = async (req, res) => {
    let { email } = req.params;

    const user = await User.findOne({ email }, "resume.education");

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.send({ message: 'Education data', payload: user.resume.education });
};

// Add a new education entry to the user’s resume
const postData = async (req, res) => {
    let { email, data } = req.body;
    console.log("Received data:", req.body);

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $push: { "resume.education": data } },
            { new: true, runValidators: true }
        );

        if (updatedUser) {
            res.status(201).send({ message: 'Education added successfully', payload: updatedUser });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error adding Education:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a Education by ID
const deleteData = async (req, res) => {
    let {email, _id} = req.body;
    console.log("Received ID for deletion:", _id, req.body);

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            {
                $pull: { "resume.education": { _id: _id } }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Education detail deleted successfully", payload: updatedUser });
    } catch (error) {
        console.error("Error deleting education detail:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getData, postData, deleteData };
