const app = require('express')()
const redisConn = require('../utils/redis-conn')
const nrpSender = require('../utils/nrp-sender-shim')

app.use(require('body-parser').json())

app.get('/api/people/:id', async (req, res) => {
    try {
        res.json(
            await nrpSender.sendMessage({
                redis: redisConn,
                eventName: 'get-person',
                data: {
                    id: req.params.id
                }
            })
        )
    } catch (e) {
        res.status(e.errorCode || 504).json({err: e.message})
    }
})

app.post('/api/people', async (req, res) => {
    try {
        res.json(
            await nrpSender.sendMessage({
                redis: redisConn,
                eventName: 'create-person',
                data: {
                    person: req.body
                }
            })
        )
    } catch (e) {
        res.status(e.errorCode || 504).json({err: e.message})
    }
})

app.delete('/api/people/:id', async (req, res) => {
    try {
        res.json(
            await nrpSender.sendMessage({
                redis: redisConn,
                eventName: 'delete-person',
                data: {
                    id: req.params.id
                }
            })
        )
    } catch (e) {
        res.status(e.errorCode || 504).json({err: e.message})
    }
})

app.put('/api/people/:id', async (req, res) => {
    try {
        res.json(
            await nrpSender.sendMessage({
                redis: redisConn,
                eventName: 'update-person',
                data: {
                    id: req.params.id,
                    person: req.body
                }
            })
        )
    } catch (e) {
        res.status(e.errorCode || 504).json({err: e.message})
    }
})

app.use("*", (req, res) => {
    res.status(404).send(`
        <h1>API DOCUMENTATION</h1>
        <ul>
            <li>GET /api/people/:id</li>
            <li>POST /api/people</li>
            <li>DELETE /api/people/:id</li>
            <li>PUT /api/people/:id</li>
        </ul>
        `)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
