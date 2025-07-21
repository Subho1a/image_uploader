import express from 'express';
import mongoose from './db.js';
const app=express();
import multer from 'multer'
import path from  'path'
import { v2 as cloudinary } from 'cloudinary';
import File from './image_schema.js';
import { url } from 'inspector';

 // Configuration
    cloudinary.config({ 
        cloud_name: 'dqgkjtruo', 
        api_key: '252164762126211', 
        api_secret: 'a65MIdPDEt5ExCicZZ7WVv6mv_g' 
    });

//home route
app.get('/',(req,res)=>{
    res.render('index.ejs',{url:null})
})


// Set storage location
const storage = multer.diskStorage({
//   destination: "./public/uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

// Route to handle file upload
app.post('/upload', upload.single('file'), async(req, res) => {
    const fileName=req.file.path
    const cloudinaryRes=await cloudinary.uploader.upload(fileName,{
        folder:"Project_2"
    })
// save the file to db
   const db=await File.create({
    filename:File.originalname,
    public_id:cloudinaryRes.public_id,
    img_Url:cloudinaryRes.secure_url
   })
   
    res.render('index.ejs',{url:cloudinaryRes.secure_url})
     console.log('File uploaded successfully!');
});


const port=3000;
app.listen(port,()=>console.log(`server is live at:${port}`))