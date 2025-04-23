const express = require('express');
const router = express.Router();
const GroupController = require('../controller/GroupChatController');


router.post('/', GroupController.createGroupChat);
router.get('/:userId', GroupController.getUserGroups);

module.exports = router;
