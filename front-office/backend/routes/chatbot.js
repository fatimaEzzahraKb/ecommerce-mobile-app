var express = require("express");
const { getUserConversation, sendMessage } = require("../controllers/ChatBotController");
var router = express.Router();

router.get("/chatbot-conv/:id",getUserConversation);
router.post("/send-to-chat/:id",sendMessage);

module.exports = router;