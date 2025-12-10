const connection = require('../database/connection')

const index = (req, res) => {

    const sql = 'SELECT * FROM movies'

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

module.exports = {
    index,
    show
}