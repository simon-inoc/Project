const express = require("express");
var path = require("path");
var app = express();
var HTTP_PORT = process.env.POST || 8080;

function onServerStart(){
    console.log("Server started on PORT: " + HTTP_PORT);
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

// GET
app.get("/findPhoneNumbers/", (req, res) => {
    let str = req.query['getRq']; 
    let resJ = [];

    // imported library
    const PNF = require('google-libphonenumber').PhoneNumberFormat;
    const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

    try{
        const number = phoneUtil.parse(str, 'CA');
        resJ.push(phoneUtil.format(number, PNF.INTERNATIONAL));
        res.json(resJ);
    } catch(ex) {
        let response = "The phone number could not be parsed by google-libphonenumber module<br>"
        res.send(response + "The error message: " + ex);
    }
});

// POST
app.post("/file", (req, res) => {
    res.send("POST recieved, now we're ready to take over the world");
})

app.use((req, res) => {
    res.status(404).send("<h2>Hm, I think we took a wrong turn somewhere. <br> Page not found - 404 thingy</h>");
});

app.listen(HTTP_PORT, onServerStart);
