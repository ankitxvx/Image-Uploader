const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/users.js');
const jwtSecret = 'safsffsfsasdsd';
require('dotenv').config();
const multer = require('multer')
const fs = require('fs')

const bcryptSalt = 10;  

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);
 
  
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await UserModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt), // Using bcryptSalt here
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const UserDoc = await UserModel.findOne({ email });
        if (UserDoc) {
            const passOk = bcrypt.compareSync(password, UserDoc.password);
            if (passOk) {
                jwt.sign({
                    email: UserDoc.email,
                    id: UserDoc._id,
                }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(UserDoc);
                });
            } else {
                res.status(422).json('pass not ok');
            }
        } else {
            res.json('not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('server error');
    }
});

 
 


const storage  = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage});
app.post('/upload',upload.single('file'), (req, res) => { 
    const upload = multer({storage}).single('file');
    upload(req,res,(err)=>{
        if(err){
            res.json(err);
        }else{
            res.json(req.file);
        }
    })
     
})

 

app.listen(8080);
