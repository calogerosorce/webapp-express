const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000
const moviesRout = require('./routers/movies')
const errorServer = require('./middlewares/serverError')
const notFound = require('./middlewares/notFound')

app.use(cors({ origin: 'http://localhost:5173' }))

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