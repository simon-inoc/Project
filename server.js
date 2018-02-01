const express = require("express");
var path = require("path");
var app = express();
var HTTP_PORT = process.env.POST || 8080;

//////////////////// Middleware ////////////////////////
// GET root/index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

// HTTP GET from URI
app.get("/findPhoneNumbers/:text", (req, res) => {

    var input = [req.params.text];
    if(typeof input === "underfined")
        input = '';

    var result = findPhoneNumber(input);
    res.json(result);
    
});

// HTTP GET from Form
app.get("/findPhoneNumbers/", (req, res) => {

    var input = req.query.getRq;
    if(typeof input === "undefined") 
        input = '';

    var result = findPhoneNumber(input);
    res.json(result);
})


// HTTP POST
app.post("/file", (req, res) => {
    res.send("POST recieved, now we're ready to take over the world");
})

// Catch All -- to find out what .use does exactlyt! or maybe app.get('*', ...) is better
app.use((req, res) => {
    res.status(404).send("<p>Hmm... I think we took a wrong turn somewhere. Let's try going <a href='/'>home</a>.<br> (404 thingy - Page not found)</p>");
});


/////// Whatever this is called: Busines Logic?/ Controller?/ Util? Buttom Layer? ///////////////////

function findPhoneNumber(input){
    var PNF = require('google-libphonenumber').PhoneNumberFormat;
    var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

    //var input2 = input.replace(/\D/g, '');
    var input2 = input;
    var number = '';

    try{
        number = phoneUtil.parse(input2, 'CA');
        number = phoneUtil.format(number, PNF.INTERNATIONAL);
    }catch(ex){ console.log(ex)} // debugging perposes
    return number;
}

////////////////////////////////////////////////////
// Party starts here
app.listen(HTTP_PORT, () => console.log("Server is running on PORT: " + HTTP_PORT));





/*
function findPhoneNumber(input){
    const PNF = require('google-libphonenumber').PhoneNumberFormat;
    var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
    varinput2 = input.replace(/\D/g, '');

    try{
        var number = phoneUtil.parse(input2, 'CA');
        number = phoneUtil.format(number, PNF.INTERNATIONAL);
    }catch(ex){} // ignore
    return number ? number: '';
}


*/