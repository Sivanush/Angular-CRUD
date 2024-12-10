import { Request, Response } from "express";
import { User } from "../models/userModel"
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const getAllUser = async(req:Request,res:Response) => {
    try {
        const userdata = await User.find({isAdmin:false})
        if (userdata) {
            const users = userdata;
            res.json(users);
        } else {
            res.status(500).json({ message: "Problem in the DataBase" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const DeleteUser = async(req:Request,res:Response) => {
    try {
        const {userId} = req.params
        const userdata = await User.findByIdAndDelete(userId)
        res.json({ userdata });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const editUser = async(req:Request,res:Response) => {
    try {
        const userId = req.params.userId;
        const userData = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    
        if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
        }
        
        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const imageUpload = async(req:Request,res:Response) =>{
    console.log(req.files);
    
    if (req.file) {
        const filePath = req.file?.path;


        const uploadOptions = {
            transformation: {
                width: 300,  
                height: 300, 
                crop: 'fill' 
            }
        };

        console.log(filePath);
        const uploadedImage = await cloudinary.uploader.upload(filePath, uploadOptions);

        res.status(200).json({ url: uploadedImage.secure_url });
    } else {
        res.status(500).json({ message: "Image Not found Try again" });
    }
}