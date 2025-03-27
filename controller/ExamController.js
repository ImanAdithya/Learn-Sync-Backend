const Exam = require('../model/Exam');

const addExam = async (req, res) => {
  try {
    const { userId, grade, subject, marks } = req.body;

    if (!userId || !grade || !subject || marks === undefined) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newExam = new Exam({
      userId,
      grade,
      subject,
      marks
    });

    await newExam.save();
    res.status(201).json({ message: "Exam Score added successfully!", exam: newExam });
  } catch (error) {
    res.status(500).json({ message: "Error Score exam record!", error: error.message });
  }
};

module.exports = { addExam };
