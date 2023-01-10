const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fsctaskmanagercluster.nda0y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        (error) => {
            if (error) {
                return console.log(
                    `Could not connect to MongoDB: ${error.message}`
                );
            }

            return console.log("Connected to MongoDB!");
        }
    );
};

module.exports = connectToDatabase;
