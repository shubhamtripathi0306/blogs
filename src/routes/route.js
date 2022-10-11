const express = require('express');
const router = express.Router();
const {createBlog,getBlogs,getBlogById,createAuthor,login}= require("../controller/mainController");
const { authentication,authorisation,blogauthorisation } = require('../middleware/authorisation');

router.post("/createAuthor",createAuthor);
router.post("/login",login);


router.post("/blogs",authentication,authorisation, createBlog); 

router.get("/getblog",authentication,getBlogs);

router.get("/getBlogById/:blogId",authentication,blogauthorisation,getBlogById)


module.exports=router;
