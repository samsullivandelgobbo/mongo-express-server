const userService = require("../services/userService")
const messageService = require("../services/messageService")
const JsonWebToken = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv").config()
const Secret = require("../middleware/generateSecret")
console.log(Secret.generate())
console.log(Secret.generate())

exports.addUser = async (req, res) => {
  try {
    let object = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      personalKey: Secret.generate(),
    }
    console.log(object.personalKey)
    const newuser = await userService.addUser(object)
    const token = JsonWebToken.sign({ id: newuser.id }, object.personalKey, {
      expiresIn: "4h",
    })
    res.status(200).json({ success: true, token: token })
  } catch (err) {
    res.status(500).json({ success: false, error: err })
  }
}

exports.userLogin = async (req, res) => {
  let email = req.body.email
  let password = req.body.password
  const validUser = await userService.validEmail(email)
  if (!validUser) {
    res.status(500).json({ success: false, error: "Invalid username" })
  } else {
    const userPassword = validUser.password
    bcrypt.compare(password, userPassword, function (err, result) {
      if (!result) {
        res.status(500).json({ success: false, error: "Invalid password" })
      }
    })
    try {
      const id = validUser.id
      const updateUser = await userService.updateUserSessionSecretKey(
        { _id: id },
        Secret.generate()
      )

      console.log(updateUser.personalKey)
      const token = JsonWebToken.sign({ id: id }, updateUser.personalKey, {
        expiresIn: "4h",
      })

      res.status(200).json({ success: true, token: token })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
}

exports.getUserByToken = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization
    const email = req.query.id
    try {
      const userSessionSecretKey = await userService.getUserByEmail(email)
      console.log(userSessionSecretKey.personalKey)
      let decoded = JsonWebToken.verify(
        authorization,
        userSessionSecretKey.personalKey
      )
      try {
        const findUser = await userService.getUserById(decoded.id)
        let object = {
          userID: findUser.id,
          email: findUser.email,
          name: findUser.name,
          messages: findUser.messages,
          isAdmin: findUser.isAdmin,
          profilePic: findUser.profilePic,
          favorites: findUser.favorites,
        }
        res.status(200).json(object)
      } catch (err) {
        res.status(500).json({ error: err })
      }
    } catch (err) {
      res.status(500).json({ success: false, error: "Authorization failed" })
    }
  } else {
    res
      .status(500)
      .json({ success: false, error: "Authorization not provided" })
  }
}

exports.userLogout = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization
    if (req.query && req.query.id) {
      let email = req.query.id
      try {
        const userSessionSecretKey = await userService.getUserByEmail(email)
        let decoded = JsonWebToken.verify(
          authorization,
          userSessionSecretKey.personalKey
        )
        if (decoded.id) {
          const resetSessionSecretKey =
            await userService.updateUserSessionSecretKey(
              { email: email },
              Secret.generate()
            )
          res
            .status(200)
            .json({ success: true, message: "User logged out succesfully" })
        }
      } catch (err) {
        res.status(500).json({ error: err })
      }
    } else {
      res
        .status(500)
        .json({ success: false, error: "User identity not provided" })
    }
  }
}

exports.addFavorite = async (req, res) => {
  try {
    const favorite = await userService.addFavoriteByUserId(
      req.body.id,
      req.body.favorite
    )
    await res.status(200).send(favorite)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.deleteFavorite = async (req, res) => {
  try {
    const newFavorites = await userService.deleteFavoriteByUserId(
      req.body.id,
      req.body.favorite
    )
    await res.status(200).send(newFavorites)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.sendMessage = async (req, res) => {
  try {
    const sendMessage = await messageService.sendMessage(req.body)
    res.status(200).send(await sendMessage)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
exports.getUsersMessages = async (req, res) => {
  try {
    const usersMessages = await messageService.getUsersMessages(req.params.id)
    res.status(200).send(usersMessages)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
