const { getDatabase } = require("../config/db");
const { ObjectId } = require("mongodb");


const getWorkData = async (req, res) => {
    const db = getDatabase();
    const userCollections = db.collection('fitFusionWorkout');
    const userEmail = req.params.email;
    const userData = await userCollections.findOne({ email: userEmail });
    res.send(userData);
};

const completeWorkout = async (req, res) => {
    const db = getDatabase();
    const workoutCollection = db.collection('fitFusionWorkout');
    const userEmail = req.params.email;
    const updatedData = req.body;

    try {
        // Update the workout status for the specified user
        const result = await workoutCollection.updateOne(
            { email: userEmail }, // Match the user's workout
            { $set: updatedData } // Update fields with the provided data
        );

        // Remove sensitive fields like `_id` from the response if needed
        delete updatedData._id;

        if (result.modifiedCount > 0) {
            res.status(200).send({ message: "Workout status updated successfully" });
        } else {
            res.status(404).send({ message: "Workout not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating workout status:", error);
        res.status(500).send({ message: "An error occurred while updating the workout status" });
    }
};


const saveWorkData = async (req, res) => {
    const workOutData = req.body;
    const db = getDatabase();
    const workOutCollection = db.collection('fitFusionWorkout');
    const result = await workOutCollection.insertOne(workOutData);

    res.status(201).send({ message: 'Meal data saved successfully', result })
};



module.exports = {
    getWorkData,
    saveWorkData,
    completeWorkout
};