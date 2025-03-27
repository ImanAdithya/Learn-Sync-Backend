const express = require('express');
const { addExam } = require('../controller/ExamController');

const router = express.Router();

router.post('/', addExam);

module.exports = router;
