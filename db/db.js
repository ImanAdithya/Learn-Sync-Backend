const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);  // Exit the process if the connection fails
    }
};

const User = require('../model/User');
const Task = require('../model/Task');

module.exports = connectDB;
