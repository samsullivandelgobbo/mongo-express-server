class BaseService {
  constructor(model) {
    this.model = model
  }
  async addObject(object) {
    return await this.model.create(object)
  }
  async loadAll() {
    return await this.model.find()
  }
  async loadAllByField(field, value) {
    return await this.model.find({ [field]: value })
  }
  async loadOneByField(field, value) {
    return await this.model.findOne({ [field]: value })
  }
  async updateOneByField(object, field, value) {
    return await this.model.findOneAndUpdate(object, field, value)
  }
  async delete(id) {
    return await this.model.findOneAndDelete({ _id: id })
  }
}

module.exports = BaseService
