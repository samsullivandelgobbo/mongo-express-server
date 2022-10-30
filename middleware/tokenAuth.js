const JsonWebToken = require("jsonwebtoken")
const dotenv = require("dotenv").config()

SECRET = process.env.TOKEN_SECRET

exports.Auth = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    let authorization = req.headers.authorization
    try {
      let decoded = JsonWebToken.verify(authorization, SECRET)
      next()
    } catch (err) {
      res.status(500).json({ success: false, error: "Authorization failed" })
    }
  } else {
    res
      .status(500)
      .json({ success: false, error: "Authorization not provided" })
  }
}
