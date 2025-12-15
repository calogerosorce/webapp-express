const express = require('express')
const router = express.Router()
const moviesControl = require('../controllers/moviesControl')

router.get('/', moviesControl.index)

router.get('/:id', moviesControl.show)

router.post('/:id/tags', moviesControl.store)

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname.replaceAll(' ', '_'))
    }

})
const upload = multer({ storage: storage })

router.post('/', upload.single('image'), moviesControl.storeMovie)
module.exports = router