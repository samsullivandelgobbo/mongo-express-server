const multer = require("multer")
const path = require("path")
const fs = require("fs")
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let stockNum = await JSON.parse(req.body.jsondata).stockNum
    if (fs.existsSync(path.join("uploads/", stockNum))) {
      console.log("Directory Exists")
    } else {
      fs.mkdir(path.join("uploads/", stockNum), (err) => {
        if (err) {
          return console.error("error", err)
        }
        console.log("Directory Created")
      })
    }
    cb(null, "uploads/" + stockNum)
  },
  filename: function (req, file, cb) {
    let parsedJSON = JSON.parse(req.body.jsondata)
    let stockNum = parsedJSON.stockNum
    if (!req.headers.index) req.headers.index = 0
    let filename = stockNum + req.headers.index++ + ".jpg"
    cb(null, filename)
  },
})

const upload = multer({ storage: storage })
module.exports = upload
