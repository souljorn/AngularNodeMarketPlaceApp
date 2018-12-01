const Message = require('../model/message');
const Conversation = require('../model/conversation');
const express = require('express');
const router = express.Router();

//*************************Message API**************************************************
module.exports = databaseStore =(message) => {
  let data = {
    sender: message.sender, //Required
    content: message.content,
    conversationID: 127 //Required
  };

  let res = express.response;
  console.log("Storing to database" + data.content + " " + data.sender);
  //Send Message to data base
  Message.create(data);

};

module.exports = getMessages =() => {

}
