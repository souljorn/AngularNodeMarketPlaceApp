const Message = require('../model/message');
const Conversation = require('../model/conversation');
const express = require('express');
const router = express.Router();

//*************************Message API**************************************************
module.exports = databaseStore =(message) => {
  let data = {
    sender: message.sender,
    content: message.content,
    conversationID: 127
  };

  let res = express.response;
  console.log("Storing to database" + data.content + " " + data.sender);
  Message.create(data);

};
