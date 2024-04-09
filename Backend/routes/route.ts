import express, { Router } from 'express'
const router:Router = express.Router()
import * as userController from '../controllers/userController'
import { upload } from '../config/multer'



router.post('/createUser',userController.createUser)
router.post('/userLogin',userController.login)
router.post('/update-Profile-Picture',upload.single('image'),userController.profileUpload)
router.get('/user-profile/:userId',userController.imagedisplay)

export default router


