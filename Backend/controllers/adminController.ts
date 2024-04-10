import { Request, Response } from "express";
import { User } from "../models/userModel"



export const getAllUser = async(req:Request,res:Response) => {
    try {
        const userdata = await User.find({isAdmin:false})
        if (userdata) {
            const users = userdata; // Directly assign the result to users
            res.json({ users });
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