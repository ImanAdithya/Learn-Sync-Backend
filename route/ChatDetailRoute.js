const express = require("express");
const { saveChatDetail,getAllMessages } = require("../controller/ChatDetailController");

const router = express.Router();

router.post("/", saveChatDetail);
router.get("/:userId/:groupId", getAllMessages);
module.exports = router;
