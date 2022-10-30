const BaseService = require("./baseService")
const Message = require("../models/messageModel")

class MessageService extends BaseService {
  async sendMessage(messageObject) {
    return this.addObject(messageObject)
  }
  async getUsersMessages(userId) {
    return (
      this.loadAllByField({ fromUser: userId }),
      this.loadAllByField({ toUser: userId })
    )
  }
}

const messageService = new MessageService(Message)
module.exports = messageService
