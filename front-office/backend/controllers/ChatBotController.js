const Message = require("../models/Message.model");
const axios = require("axios");

async function getUserConversation(req, res) {
 try {
  const user_id = req.params.user_id;
  const messages = await Message.findAll({ where: { user_id: user_id, type: "message" }, order: [["createAt", "ASC"]] });
  const answers = await Message.findAll({ where: { user_id: user_id, type: "answer" }, order: [["createAt", "ASC"]] });

  const allMessages = await Message.findAll({ where: { user_id: user_id }, order: [["createdAt", "ASC"]], attributes: ["content", "type", "createdAt"] });
  return res.status(200).json({ messages: messages, answers: answers, allMessages: allMessages });

 }
 catch (error) {
  console.log("Error during loading conversation", error);
  res.status(500).json(error);
 }
}

async function sendMessage(req, res) {
 try {
  const user_id = req.params.id;
  const content = req.body.content
  console.log("Sending prompt:", content);
  // const message = await Message.create({user_id:user_id,type:"message",content:content});

  // Calling local API to communicate with the AI modal (llama3/ tinyLama) 
  const response = await axios.post(`http://localhost:8000/generate?prompt=${content}`);
  console.log(response);
  // const answer = await Message.create({user_id:user_id,type:"answer",content:response.data.response});
  // return res.status(200).json({answer : answer, message:message});
 /*  const response = await fetch('http://localhost:8000/generate', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json'
   },
   body: JSON.stringify({ prompt: content })
  });

  const data = await response.json();
  console.log(data.response); */
  return res.status(200).json({ response:response.data.response });

 }
 catch (error) {
  console.log("Error during sending message", error);
  res.status(500).json(error.messages);
 }
}

module.exports = { getUserConversation, sendMessage };