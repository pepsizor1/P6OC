
const mongoose = require("mongoose")
const {unlink} = require("fs")

const productSchema = new mongoose.Schema({
    userId: String,
    name: String,
    manufacturer: String,
    description: String,
    mainPepper: String,
    imageUrl: String,
    heat: Number,
    likes: Number,
    dislikes: Number,
    usersLiked: [String],
    usersDisliked : [String],
})

const Product = mongoose.model("Product", productSchema)

function getSauces(req, res)  {
    
 Product.find({}).then(products => res.send(products))

}

async function getSaucebyid(req, res) {
 
 try {
   const {id} = req.params
   const product = await Product.findById(id)
   res.send(product)
 }
 catch(error){
   res.status(500).send(error)
 }
}

function createSauce(req,res){
 const body = req.body
 const file = req.file
 
    const sauce = JSON.parse(req.body.sauce)
 const {name, manufacturer, description, mainPepper, heat, userId} = sauce
 const imagePath = req.protocol + "://" + req.get("host") + "/" + req.file.filename
 console.log({ imagePath}) 
    
 const product = new Product({
    userId: userId,
    name: name,
    manufacturer: manufacturer,
    description: description,
    mainPepper: mainPepper,
    imageUrl: imagePath,
    heat: heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked : [],
 })
 
 product
   .save()
   .then((message)=> {
      res.status(201).send({message : message})
      return console.log("good", message)
   })
   .catch(console.error)
}

function deleteSauce(req,res){
   const {id} = req.params
   Product.findByIdAndDelete(id)
   .then(deleteImage) 
   .then((product) => res.send({message : product}))
    .catch(err=> res.status(500).send({message: err}))
}

function deleteImage(product){
   const imageUrl = product.imageUrl
   const imgtodelete = imageUrl.split("/").at(-1)
   unlink(`images/${imgtodelete}`, (err)=> {
      console.error("Problème", err)
   })
   return product
}

module.exports = {createSauce, getSauces, getSaucebyid, deleteSauce}