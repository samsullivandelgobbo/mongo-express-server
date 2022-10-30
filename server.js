const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const fs = require("fs")
const http = require("http")
// const https = require('https');
// const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
// const credentials = {key: privateKey, cert: certificate};

const app = express()

const userRoutes = require("./routes/userRoutes")
const vehicleRoutes = require("./routes/vehicleRoutes")

dotenv.config()
//database connection
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected")
  })
  .catch((err) => {
    console.log({ database_error: err })
  })

//declare middleware
app.use(cors())
app.use(bodyParser.json())
app.use(morgan("dev"))

//routes
app.use("/user", userRoutes)
app.use("/inventory", vehicleRoutes)

app.use("/uploads", express.static("uploads"))

var httpServer = http.createServer(app)
// var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, () => {
  console.log("HTTP is running on port 8080")
})

// httpsServer.listen(8443);

// app.listen(PORT, () => {
//   console.log("app is running on port:", PORT)
// })
