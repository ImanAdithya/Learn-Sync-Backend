const express = require('express');
const connectDB = require('./db/db');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./route/UserRoute');
const taskRoute = require('./route/TaskRoute');
const examRoute = require('./route/ExamRoute');
const groupChatRoute = require('./route/GroupChatRoute');
const chatDetailRoute = require('./route/ChatDetailRoute');


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

app.use('/api/users', userRoutes);
app.use('/api/task', taskRoute);
app.use('/api/exam', examRoute);
app.use('/api/groupChat', groupChatRoute);
app.use('/api/chatDetail', chatDetailRoute);

// Simple route to test
app.get('/', (req, res) => {
    res.send('Hello, MongoDB connected!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
