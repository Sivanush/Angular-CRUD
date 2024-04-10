import mongoose from "mongoose"

const  userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      isAdmin: {
        type:Boolean,
        default:false
      },
      image:{
        type:String,
        default:'https://res.cloudinary.com/dzarnizdl/image/upload/v1712649073/znsarfxjv97qkbsul2oa.jpg'
      }
})

export const User = mongoose.model('user',userSchema)