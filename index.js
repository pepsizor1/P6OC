require('dotenv').config()
require("./mongo")

const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'images');
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
    }
});
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
const {createUser, logUser} = require("./controller/users")
const {getSauces, createSauce, getSaucebyid, deleteSauce} = require("./controller/sauces")
const {verifyauth} = require("./auth")
const upload = multer({storage: storage}).single('image');

app.use(cors())
app.use(express.json())

app.post("/api/auth/signup", createUser)
app.post("/api/sauces", verifyauth, upload,createSauce)
app.post("/api/auth/login", logUser)
app.get("/api/sauces",verifyauth, getSauces)
app.get("/api/sauces/:id", verifyauth, getSaucebyid)
app.delete("/api/sauces/:id", verifyauth, deleteSauce)

app.listen(port, () => console.log("Listening on port" + port))
app.use(express.static("images"))
