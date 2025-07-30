import express from 'express'
import { getUserProfile, login, Register } from '../controller/userController.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'

const router= express.Router()

router.post("/register", Register)
router.post("/login", login)
router.get("/profile", isAuthenticated, getUserProfile)
export default router