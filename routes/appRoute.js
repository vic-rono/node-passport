const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../ensure')
const  {home, dashboard} =  require('../controllers/appController')

router.get('/' ,home)
router.get('/dashboard', ensureAuthenticated,  dashboard)

module.exports = router