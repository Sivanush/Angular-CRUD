import { Request, Response } from "express";
import { User } from "../models/userModel"



export const getAllUser = async(req:Request,res:Response) => {
    try {
        const userdata = await User.find({isAdmin:false})
        if (userdata) {
            res.json({users:userdata})
        } else {
            res.status(500).json({ message: "Problem in the DataBase" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}