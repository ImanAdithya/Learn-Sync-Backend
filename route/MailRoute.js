const express = require('express');
const router = express.Router();
const {
    sendMail
} = require('../controller/SendMailController');
  
router.post('/register',sendMail);  
router.post('/recover',sendMail);  

module.exports = router;
