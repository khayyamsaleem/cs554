require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const redisConn = require('./utils/redis-conn')
const nrpSender = require('./utils/nrp-sender-shim')

const PORT = process.env.PORT || 8080

app.use(express.static('public'))

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
    console.log('client connection established')
    socket.emit('server listening')

    socket.on('search query', async payload => {
        const { username, message, query } = payload
        const image_url = "https://www.fotolip.com/wp-content/uploads/2016/05/Funny-Baby-Pictures-1.jpg"
        const worker_response = await nrpSender.sendMessage({
            redis: redisConn,
            eventName: 'research',
            data : {
                query
            }
        })
        const hits = worker_response.researchResult.hits

        socket.emit('search query', {username, message, hits})
    })

    socket.on('disconnect', () => {
        console.log('client disconnected')
    })


})


http.listen(PORT, () => {
    console.log(`🚀 Server launched on http://localhost:${PORT}`)
})
