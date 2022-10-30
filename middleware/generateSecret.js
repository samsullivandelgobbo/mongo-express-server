const { randomBytes } = require("crypto")

exports.generate = () => {
  return randomBytes(64).toString("hex")
}
