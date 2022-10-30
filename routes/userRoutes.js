const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const tokenAuth = require("../middleware/tokenAuth")
// const googleAuthController = require("../controllers/googleAuthController")

router.post("/register", userController.addUser)
router.post("/login", userController.userLogin)

router.get("/logout", userController.userLogout)

router.post("/favorite", tokenAuth.Auth, userController.addFavorite)

router.post("messages/send", tokenAuth.Auth, userController.sendMessage)
router.get("/messages/get", tokenAuth.Auth, userController.getUsersMessages)

router.get("/verify", userController.getUserByToken)

router.post("/favorite/remove", tokenAuth.Auth, userController.deleteFavorite)

// router.post('/messages/send', userController.sendMessage)
// router.get('/messages/user/:id', userController.getUserMessages)

// router.get('/auth/google', googleAuthController.GoogleUser)
// router.get('/auth/google/callback', passport.authenticate("google", { failureRedirect: 'http://localhost:5173', session: false}), googleAuthController.GenerateToken
// )

module.exports = router
