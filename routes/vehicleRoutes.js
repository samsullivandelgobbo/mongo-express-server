const express = require("express")
const router = express.Router()
const vehicleController = require("../controllers/vehicleController")
const multerUpload = require("../middleware/multer")
const tokenAuth = require("../middleware/tokenAuth")

router.post(
  "/add-vehicle",
  tokenAuth.Auth,
  multerUpload.array("file[]"),
  vehicleController.addNew
)

router.post("/update/sold", tokenAuth.Auth, vehicleController.updateSoldState)
router.post("/multiple", tokenAuth.Auth, vehicleController.getByMultiple)

router.get("/", vehicleController.loadAll)

module.exports = router
