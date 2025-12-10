const express = require('express')
const router = express.Router()
const moviesControl = require('../controllers/moviesControl')

router.get('/', moviesControl.index)

router.get('/:id', moviesControl.show)

module.exports = router