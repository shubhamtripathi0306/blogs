const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");
const jwt = require("jsonwebtoken");
const { isValid, isValidRequestBody } = require("../validator/validator");
const { isValidObjectId } = require("mongoose");

const createAuthor = async (req, res) => {
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Invalid request parameters. Please provide User details",
        });
    }
    const { name, email, password } = req.body;

    if (!isValid(name)) {
      return res
        .status(400)
        .send({ status: false, message: "name is required" });
    }

    if (!isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Email should be valid email" });
    }
    const emailAlreadyUsed = await authorModel.findOne({ email });
    if (emailAlreadyUsed) {
      return res
        .status(400)
        .send({ status: false, message: `${email} is already registered` });
    }

    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(
        password
      )
    ) {
      return res
        .status(400)
        .send({ status: false, message: "password should be valid password" });
    }
    const newUser = { name: name, email: email, password: password };

    const authorCreated = await authorModel.create(newUser);
    res
      .status(201)
      .send({ status: true, message: "Success", data: authorCreated });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const login = async function (req, res) {
  let data = req.body;
  let emailId = data.email;
  let password = data.password;
  let result = await authorModel.findOne({
    email: emailId,
    password: password,
  });
  if (!result) {
    return res.send({
      status: false,
      msg: "Invalid Author Credentials,please Check..!!",
    });
  }
  let payload = { id: result._id };
  let token = jwt.sign(payload, "viper");
  res.setHeader("x-auth-token", token);
  res.send({
    status: true,
    msg: "Author Successfully LoggedIn",
    tokenData: token,
  });
};

const createBlog = async (req, res) => {
  try {
    const requestBody = req.body;
  

    if (!isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Invalid Request parameters. Please provide blog details",
        });
    }
    const { name, body, category, authorId } = req.body;

    if (!isValid(name)) {
      return res
        .status(400)
        .send({ status: false, message: "name is required" });
    }
    const nameExist = await blogModel.findOne({ name });
    if (nameExist) {
      return res
        .status(400)
        .send({ status: false, message: "name already exists" });
    }

    if (!isValid(body)) {
      return res
        .status(400)
        .send({ status: false, message: "body is required" });
    }

    if (!isValid(category)) {
      return res
        .status(400)
        .send({ status: false, message: "category is required" });
    }

    const newblog = { name, body, category, authorId };

    const blogCreated = await blogModel.create(newblog);
    res
      .status(201)
      .send({ status: true, message: "Success", data: blogCreated });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//===============================================================================
const getBlogs = async function (req, res) {
  try {
   
   
    const { page,limit } = req.query

 
    // const limitValue = req.query.limit || 2;
    //     const skipValue = req.query.skip || 0;
        const blog = await blogModel.find().select({__v:0,createdAt:0,updatedAt:0}).limit(limit * 1).skip((page - 1) * limit)



  //  const blog = await blogModel.find({ isDeleted: false });



    if (blog.length == 0) 
     return res.status(404).send({ status: false, msg: "No blog found" });
   
      res.status(200).send({ status: true, data: blog });
    
  } catch (err) {
    console.log("This is the error :", err.message);
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

//====================================================================================
const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    if (!isValidObjectId(blogId)) {
      return res
        .status(400)
        .send({ status: false, message: "Only Object Id allowed !" });
    }

    const blogs = await blogModel.findOne({ _id: blogId, isDeleted: false });
    if (!blogs) {
      return res.status(404).send({ status: false, message: "blog not found" });
    }

    const blog = await blogModel
      .findOne({ blogId: blogId, isDeleted: false })
      .select({ isDeleted: 0, __v: 0 });

  let str = blog.body
console.log(str)
    
        let ress = []
        let strArr = str.split(" ")
        strArr.forEach(element => {
            if (element[0] === "A" || element[0] === "a") {
                ress.push(element)
            }
            return ress
        })
    
        for(var i = 0; i < ress.length; i++)
        {
            let str =  ress[i].slice(-3)
        
            ress[i] = ress[i].replace(str, '*');
        }


    res.status(200).send({ status: true, message: "blogs list", data:ress });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }}
;

module.exports = { createBlog, createAuthor, getBlogs, getBlogById, login };
