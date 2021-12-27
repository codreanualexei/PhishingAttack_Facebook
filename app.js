const express = require('express')
var bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
var fs = require('fs')
var xmlparser = require('express-xml-bodyparser');

const PORT = 3000;

//Configure environment files
dotenv.config()

//Create an application with express
const app = express()

//Use json format fot this application
app.use(express.json());
app.use(bodyParser.urlencoded())
app.use(xmlparser());

//set view engine
app.set('view engine','ejs')

//Make public static folders
app.use('/validation', express.static('validation')) //for images

app.get('/validation/91768CDC3F00444F8AC0AA834EAF4E20', function (req, res) {
    res.render('91768CDC3F00444F8AC0AA834EAF4E20')
});



app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});







