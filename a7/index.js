const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const nrpSenderShim = require('utils/nrp-sender-shim')

const PORT = process.env.PORT || 8080

app.use(express.static('public'))

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
    console.log('client connection established')
    socket.emit('server listening')

    socket.on('search query', payload => {
        const { username, message } = payload
        const image_url = "https://www.fotolip.com/wp-content/uploads/2016/05/Funny-Baby-Pictures-1.jpg"
        io.emit('search query', {username, message, image_url})
    })


})


http.listen(PORT, () => {
    console.log(`🚀 Server launched on http://localhost:${PORT}`)
})
