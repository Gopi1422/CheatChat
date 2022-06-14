const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatControllers");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(authenticateUser, accessChat);
router.route("/").get(authenticateUser, fetchChats);
router.route("/group").post(authenticateUser, createGroupChat);
router.route("/rename").put(authenticateUser, renameGroup);
router.route("/groupremove").put(authenticateUser, removeFromGroup);
router.route("/groupadd").put(authenticateUser, addToGroup);

module.exports = router;
