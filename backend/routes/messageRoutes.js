const express = require("express");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageControllers");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(authenticateUser, sendMessage);
router.route("/:chatId").get(authenticateUser, allMessages);

module.exports = router;
