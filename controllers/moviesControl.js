const { text } = require('express')
const connection = require('../database/connection')

const index = (req, res) => {

    const sql = 'SELECT * FROM movies ORDER BY id DESC'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message })
        res.json(results)
    })
}

const show = (req, res) => {

    const id = Number(req.params.id)

    const sql = 'SELECT * FROM movies WHERE id = ?';
    const sqlReview = ' SELECT reviews.id, reviews.name, reviews.vote, reviews.text, reviews.created_at FROM reviews WHERE movie_id = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message })
        if (results.length === 0) return res.status(404).json({ error: true, message: 'Movies not found' })

        const movie = results[0]

        connection.query(sqlReview, [id], (errReview, resReview) => {
            movie.tag = resReview
            res.json(movie)
        })

    })
}

const storeMovie = (req, res) => {
    const { title, director, genre, release_year, abstract } = req.body
    const image = req.file ? req.file.filename : null

    const imageLog = image


    const sql = 'INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)'
    connection.query(sql, [title, director, genre, release_year, abstract, imageLog], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message })
        res.status(201).json({ message: 'Movie created', id: results.insertId })
    })
}

const store = (req, res) => {
    const movieId = Number(req.params.id)
    const { name, vote, recensione } = req.body

    if (name === "" || name.length <= 3) {
        return res.status(400).send("Name not found")
    } else if (vote == "") {
        return res.status(400).send("Vote not found")
    } else if (recensione === "" || recensione.length <= 10) {
        return res.status(400).send("Text not found")
    }

    const sql = 'INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)'
    connection.query(sql, [movieId, name, vote, recensione], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message })
        res.status(201).json({ message: "Review created", reviewId: results.insertId })
    })
}


module.exports = {
    index,
    show,
    storeMovie,
    store
}