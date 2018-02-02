/* Server */
let express = require("express");
let app     = express();

/* Middleware */
let fs          = require('fs');
let path        = require('path');
let phoneUtil   = require('google-libphonenumber').PhoneNumberUtil.getInstance();
let PNF         = require('google-libphonenumber').PhoneNumberFormat;
let multer      = require('multer');
let fileUpload  = multer({ dest: 'uploads/'}); // I don't get this. TODO: find out how multer works

/* Http */
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname + "/views/index.html"));
});

// Manual GET
app.get('/findPhoneNumbers/:str', (req, res) => {
    
    if(typeof req.params.str === 'undefined'){
        res.status(200).json();
        return;
    }

    // findPhoneNumbers() always return an array
    let result = findPhoneNumbers(req.params.str);
    res.json(result);
});

// Form GET
app.get('/findPhoneNumbers/', (req, res) => {
    if(typeof req.query.getRq === 'undefined'){
        res.status(200).json();
        return;
    }

    // findPhoneNumbers() always return an array
    let result = findPhoneNumbers(req.query.getRq);
    res.json(result);
});

// POST file
app.post('/file', fileUpload.single("file"), function(req, res) {
    if(!req.file){
        res.status(400).send("No file was uploaded.");
        return;
    }

    let fileRaw = fs.readFileSync(req.file.path);
    let fileContent = Buffer.from(fileRaw, 'base64').toString('ascii');
    
    let result = findPhoneNumbers(fileContent);
    res.json(result);

});

function findPhoneNumbers(str){
    
    var arr = str.split('\n');
    var numberArr = [];
    var phoneNumberArr = [];
    
    for(let i=0; i<arr.length; i++){
        numberArr.push(arr[i].replace(/\D/g, ''));
    }

    for(let i=0; i<numberArr.length; i++){
        try{
            let phoneNum = phoneUtil.parse(numberArr[i], 'CA');
            phoneNumberArr.push(phoneUtil.format(phoneNum, PNF.INTERNATIONAL));
        }catch(err) { /*console.log(err);*/ }
    }
    
    // briliant little function, that uses Set container constraint - all elements have to be unique  
    // Props to Bakytzhan (Jean) Apetov
    // or it is too clever according to @Devid ?
    return Array.from(new Set(phoneNumberArr)); 
}

// the party starts here
app.listen(2035, () => {
    console.log("The server is listening on PORT: 2035");
}) 