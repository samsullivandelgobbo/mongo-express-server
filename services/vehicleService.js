const BaseService = require("./baseService")
const Vehicle = require("../models/vehicleModel")

class VehicleService extends BaseService {
  async getAll() {
    return this.loadAll()
  }
  async addVehicle(vehicleObject) {
    return this.addObject(vehicleObject)
  }
  async getAllWith(field, value) {
    return await this.loadAllByField(field, value)
  }
  async getOneWith(field, value) {
    return await this.loadOneByField(field, value)
  }
  async updateVehicle(vehicleObject, field, value) {
    return await this.updateOneByField(vehicleObject, field, value)
  }
  async delete(vehicleId) {
    return await this.delete(vehicleId)
  }
}

const vehicleService = new VehicleService(Vehicle)
module.exports = vehicleService
