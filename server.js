const express = require('express')
const app = express()
const PORT = 3000
const moviesRout = require('./routers/movies')
const errorServer = require('./middlewares/serverError')
const notFound = require('./middlewares/notFound')

app.use(express.static('public'))

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Example app listening on PORT http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    res.send('Movies app on')
})

app.use('/movies', moviesRout)

app.use(errorServer)
app.use(notFound)