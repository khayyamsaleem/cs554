const fs = require('fs')

const getById = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.readFile('dummydata.json', 'utf-8', (err, res) => {
                if (err) throw err
                const data = JSON.parse(res)
                const u = data.find(u => u.id == id)
                u ? resolve(u) : reject()
            })
        }, 5000)
    })
}

module.exports = { getById }
