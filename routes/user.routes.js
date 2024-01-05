const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { upload } = require("./uploads");
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './uploads');
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname); 
//     },
//   });

// const upload = multer({ storage });


const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{

    const {email,password} = req.body
    // const avatar = req.file ? req.file.path : undefined;
    try {
        const user = await UserModel.findOne({email});

        if(user){
            return res.status(201).send({message:`${email} is already register login please`})
        }
        else{
            const hashpass= bcrypt.hashSync(password,5);
            const newUser = new UserModel({
                ...req.body,
                password:hashpass
               
            })
            await newUser.save();
            return res.status(201).send({message:"New user has been registered ","New_User":newUser})
        }
        
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
});

userRouter.post("/login",async(req,res)=>{
    const {email, password} = req.body;


    try {
    
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password, (err,result)=>{
                if(result){
                    const token = jwt.sign({couse:"RM101"},"masai");
                    return res.status(201).send({message:"User has been loged in successful!", "token":token, "avatar":user.avatar,"name":user.name,"gender":user.gender});
                }
                else return res.status(400).send({message:"Password not match"})
            })
        }
    } catch (error) {
        res.status(400).send({message:error.message})
        
    }
})
module.exports ={userRouter}