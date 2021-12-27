const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
var fs = require('fs')

const PORT = process.env.PORT || 5000;

//Configure environment files
dotenv.config()

//Create an application with express
const app = express()

//Use json format fot this application
app.use(express.json());

//set view engine
app.set('view engine','ejs')

//Make public static folders
app.use('/validation', express.static('validation')) //for images

app.get('/', function (req, res) {
    res.render('index')
});

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});







