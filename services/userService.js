const BaseService = require("./baseService")
const User = require("../models/userModel")

class UserService extends BaseService {
  async addUser(userObject) {
    return await this.addObject(userObject)
  }
  async validEmail(email) {
    return await this.loadOneByField("email", email)
  }
  async getUserById(userId) {
    return await this.loadOneByField("_id", userId)
  }
  async getUserByEmail(email) {
    return await this.loadOneByField("email", email)
  }
  async updateUserSessionSecretKey(field, secretKey) {
    return await this.updateOneByField(
      field,
      { personalKey: secretKey },
      { new: true }
    )
  }
  async addFavoriteByUserId(userId, favorite) {
    return await this.updateOneByField(
      { _id: userId },
      { $push: { favorites: favorite } }
    )
  }
  async deleteFavoriteByUserId(userId, favorite) {
    return await this.updateOneByField(
      { _id: userId },
      { $pull: { favorites: favorite } }
    )
  }
  async deleteUser(user) {
    return await this.delete(user)
  }
}

const userService = new UserService(User)
module.exports = userService
