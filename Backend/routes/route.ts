import express, { Router } from 'express'
const router:Router = express.Router()
import * as userController from '../controllers/userController'
import { upload } from '../config/multer'
import * as adminController from '../controllers/adminController'

//user

router.post('/createUser',userController.createUser)
router.post('/userLogin',userController.login)
router.post('/update-Profile-Picture',upload.single('image'),userController.profileUpload)
router.get('/user-profile/:userId',userController.imagedisplay)


//admin

router.get('/userData',adminController.getAllUser)
router.delete('/deleteUser/:userId',adminController.DeleteUser)
export default router


