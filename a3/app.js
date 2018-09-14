const express = require('express')
const app = express()
const static = express.static(__dirname + '/public')



app.use('/public', static)
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', {title: 'Hey', message: 'Hello there!'})
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running http://localhost:3000')
})
