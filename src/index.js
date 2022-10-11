const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const mongoose = require('mongoose');
const app = express();
let URI = "mongodb+srv://thorium-cohort:qwertyuiop@cluster0.xyklh.mongodb.net/blogsCollection?authSource=admin&replicaSet=atlas-wc30tm-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(URI, {
    useNewUrlParser: true 
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

