const express = require('express');
const connectDB = require('./db/db');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./route/UserRoute');



const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

app.use('/api/users', userRoutes);

// Simple route to test
app.get('/', (req, res) => {
    res.send('Hello, MongoDB connected!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
