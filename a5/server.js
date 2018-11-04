const app = require('express')()
const Promise = require('bluebird')
const cache = Promise.promisifyAll(require('express-redis-cache')())
const { getById } = require('./data_module')

app.get('/api/people/history', async (req, res) => {
    const history = await cache.getAsync('history')
    const users = getFieldFromCache(history, 'history')
    if(users) res.send(users.slice(0, 20))
    else res.send({err: "History currently empty! View users with posts to /api/people/:id"})

})

app.get('/api/people/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const result = await cache.getAsync('users')
    const users = getFieldFromCache(result, 'users')
    if (users) { //some users found in cache, see if our user is one of them
        const hist = await cache.getAsync('history')
        const hist_users = getFieldFromCache(hist, 'history')
        let u = users.find(u => u.id == id)
        if (!u) { //couldn't find user in cache, so must search actual data
            try {
                u = await getById(id)
                users.push(u)
                await cache.addAsync('users', JSON.stringify({users: users}))

                hist_users.unshift(u)
                await cache.addAsync('history', JSON.stringify({history: hist_users}))

                res.send(u)
            } catch (e) {
                res.status(404).send({error: `No such user found with id ${id}`})
            }
        } else { // found user in cache
            hist_users.unshift(u)
            await cache.addAsync('history', JSON.stringify({history: hist_users}))
            res.send(u)
        }
    } else {
        //no users in cache, need to create new cache entry (initial cache population)
        try {
            let u = await getById(id)
            await cache.addAsync('users', JSON.stringify({users: [u]}))
            await cache.addAsync('history', JSON.stringify({history: [u]}))
            res.send(u)
        } catch (e) {
            res.status(404).send({error: `No such user found with id ${id}`})
        }

    }
})

app.get('/', async (req, res) => {
    res.redirect('/api/people/history')
})

const getFieldFromCache = (cache, field) => {
    return cache.length ? JSON.parse(cache[0].body)[field] : undefined
}

app.listen(3000, () => console.log("Listening at http://localhost:3000"))
