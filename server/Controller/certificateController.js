const { Certificate, User } = require('../db');

// Get certificate data by email
const getData = async (req, res) => {
    let { email } = req.params;

    const user = await User.findOne({ email }, "resume.certificates");

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.send({ message: 'Certificate data', payload: user.resume.certificates });
};

// Add a new certificate to the user’s resume
const postData = async (req, res) => {
    let { email, data } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $push: { "resume.certificates": data } },
            { new: true, runValidators: true }
        );

        if (updatedUser) {
            res.status(201).send({ message: 'Certificate added successfully', payload: updatedUser });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error adding certificate:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a certificate by ID
const deleteData = async (req, res) => {
    let id = req.body.id;

    try {
        const deletedCertificate = await Certificate.findByIdAndDelete(id);

        if (!deletedCertificate) {
            return res.status(404).json({ error: "Certificate not found" });
        }

        res.status(200).send({ message: 'Certificate deleted successfully', payload: deletedCertificate });
    } catch (error) {
        console.error("Error deleting certificate:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getData, postData, deleteData };
