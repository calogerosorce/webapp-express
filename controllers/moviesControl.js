const connection = require('../database/connection')

const index = (req, res) => {

    res.send('Show all movies')
}

const show = (req, res) => {
    res.send(`Show movie id ${req.params.id}`)
}

module.exports = {
    index,
    show
}