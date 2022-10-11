const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

const authentication = async function (req, res, next) {
  try {
      let token = req.headers["x-auth-token"];
      if (!token) return res.status(400).send({ status: false, msg: "login is required" })
      let decodedtoken = jwt.verify(token, "viper")

  req.token = decodedtoken

      if (!decodedtoken) return res.status(401).send({ status: false, msg: "token is invalid" })
      next();
  }
  catch (error) {
      console.log(error)
      return res.status(500).send({ msg: error.message })
  }
}

//==================================================================

let authorisation= async function (req,res,next){
  try{

let id = req.body.authorId

if(req.token.id != id){
  console.log(req)
  return res.status(403).send({status: false, msg: "unauthorize access"})
}next()}

catch (err) {return res.status(500).send({ status : false, error: err.msg })}}



//=========================================================

let blogauthorisation= async function (req,res,next){
  try{

let author = await blogModel.findById(req.params.blogId)
let authorId = author.authorId.toString()

if(req.token.id!=authorId){
  return res.status(403).send({status: false, msg: "unauthorize access "})
}

next()
}
catch (err) {return res.status(500).send({ status : false, error: err.msg })}}


module.exports = { authentication ,blogauthorisation,authorisation}
