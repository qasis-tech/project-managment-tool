const express = require('express');
const app = express();
const multer = require('multer');



app.post("/image", (req, res) => {
    upload(req, res, (err) => {
     if(err) {
       res.status(400).send("Something went wrong!");
     }
     res.send(req.file);
   });
 });

 const storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './uploads');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    }
 });

 const upload = multer({ storage: storage }).single("demo_image");
app.listen(3000, () => { 
    console.log('Started on port 3000');
});