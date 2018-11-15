const app = require('express')()
const redisConn = require('./utils/redis-conn')

app.use(require('body-parser').json())

app.get('/api/people/:id', async (req, res) => {

})

app.post('/api/people', async (req, res) => {

})

app.delete('/api/people/:id', async (req, res) => {

})

app.put('/api/people/:id', async (req, res) => {

})

app.use("*", (req, res) => {
    res.status(404).send(`
        API DOCUMENTATION
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
