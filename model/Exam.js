const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const examSchema = new mongoose.Schema({
  examId: {
    type: String,
    default: () => uuidv4(), 
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now // Auto-set current date
  },
  marks: {
    type: Number,
    required: true,
    min: 0
  }
});

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;
