const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose.connect(process.env.MONGO_URL, (error) => {
        if (error) {
            return console.log(
                `Could not connect to MongoDB: ${error.message}`
            );
        }

        return console.log("Connected to MongoDB!");
    });
};

module.exports = connectToDatabase;
