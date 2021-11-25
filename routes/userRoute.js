const express = require('express')
const router = express.Router()
const  {user, register, registers, login, logout} =  require('../controllers/userController')

router.get('/login' , user)
router.get('/register' , register)
router.post('/register', registers)
router.post('/login' , login)
router.get('/logout' , logout)



module.exports = router