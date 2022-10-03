
const jwt = require("jsonwebtoken")
function verifyauth(req,res,next){
    const header = req.header("Authorization")
    if (header == null) return res.status(403).send({ message: "Invalid"})
   
    const token = req.headers.authorization.split('Bearer ')[1]
    if (token == null)  return res.status(403).send({ message: "Token cannot be null"})
   
    jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded)=> {
      if (err)  return res.status(403).send({ message: "Token envalid" + err}) 
      next()})
   
   }

   module.exports = {verifyauth}