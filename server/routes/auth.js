import express from 'express'
import { getUsers, createUser, loggingIn, deleteUser,tokenValid,getUser } from '../controllers/users.js'
import { auth } from '../middleware/auth.js'
const router = express.Router()

router.get('/',getUsers)
router.get('/user',auth, getUser)
router.post('/register',createUser)
router.post('/login',loggingIn)
router.delete('/delete',auth,deleteUser)
router.post('/tokenvalid',tokenValid)

export default router