const express = require('express');
const router = express.Router();
const taskController = require('../controller/TaskController');

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:userId', taskController.getTasksByUserId);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
