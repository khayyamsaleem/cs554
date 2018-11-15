const fetch = require('node-fetch'),
    redisConn = require('../utils/redis-conn')

const DUMMY_DATA_URL = 'https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json';

(async () => {
    /* downloading file */
    const res = await fetch(DUMMY_DATA_URL)
    let data;
    if (res.ok) {
        data = await res.json()
        console.log(`\x1b[32mSUCCESS:\x1b[0m File in memory`)
    } else {
        console.log(`\x1b[31mERROR:\x1b[0m File not available at ${DUMMY_DATA_URL}`)
        return
    }

    const required_keys = ['id', 'first_name', 'last_name', 'email', 'gender', 'ip_address']
    const validate_person = person => {
        for (let i = 0; i < required_keys.length; ++i)
            if (!person[required_keys[i]])
                return `${required_keys[i]} required when creating person`
        for (let key in person){
            if (!required_keys.includes(key))
                return `${key} not a valid field for a person!`
            if (key == 'id'){
                if (isNaN(parseInt(person[key], 10) ) || parseInt(person[key]) <= 0)
                    return "Valid id Required"
            } else {
                if (typeof person[key] !== 'string')
                    return `Type of ${key} must be string`
            }
        }

        for (let i = 0; i < data.length; ++i)
            if (data[i].id == person.id)
                return `Person with id ${person.id} already exists!`;
    }




    /* GET /api/people/:id */
    redisConn.on('get-person:request:*', (msg, chan) => {
        let {requestId, eventName} = msg

        let successEvent = `${eventName}:success:${requestId}`
        let failedEvent = `${eventName}:failed:${requestId}`

        let id = parseInt(msg.data.id, 10)
        /* error checking parameter */
        if (id <= 0 || isNaN(id)){
            redisConn.emit(failedEvent, {
                requestId,
                eventName,
                data: {
                    message: 'Invalid value for ID',
                    errorCode: 400
                }
            })
        }


        /* finding person */
        let person;
        for (let i = 0; i < data.length; ++i)
            if (data[i].id == id) {
                person = data[i]
                break
            }

        redisConn.emit(person ? successEvent : failedEvent, {
            requestId,
            eventName,
            data: person ? person : {message: 'Person not found', errorCode: 404},
        })
    })


    /* POST /api/people */
    redisConn.on('create-person:request:*', (msg, chan) => {
        let {requestId, eventName} = msg

        let successEvent = `${eventName}:success:${requestId}`
        let failedEvent = `${eventName}:failed:${requestId}`

        let person = msg.data.person

        let err = validate_person(person)
        if (!err)
            data.push(person)
        redisConn.emit(err ? failedEvent : successEvent, {
            requestId,
            eventName,
            data: err ? {message: err, errorCode: 400} : person
        })
    })


    /* DELETE /api/people/:id */
    redisConn.on('delete-person:request:*', (msg, chan) => {
        let {requestId, eventName} = msg

        let successEvent = `${eventName}:success:${requestId}`
        let failedEvent = `${eventName}:failed:${requestId}`

        let id = parseInt(msg.data.id, 10)
        /* error checking parameter */
        if (id <= 0 || isNaN(id)){
            redisConn.emit(failedEvent, {
                requestId,
                eventName,
                data: {
                    message: 'Invalid value for ID',
                    errorCode: 400
                }
            })
        }

        let found = false;
        for (let i = 0; i < data.length; i++)
            if (data[i]['id'] == id) {
                data.splice(i, 1);
                found = true;
                break;
            }

        redisConn.emit(found ? successEvent : failedEvent, {
            requestId,
            eventName,
            data: found ? { success: `Person with id ${id} deleted!`} : {message: `Person with id ${id} not found`, errorCode: 404}
        })
    })


    /* PUT /api/people/:id */
    redisConn.on('update-person:request:*', (msg, chan) => {
        let {requestId, eventName} = msg

        let successEvent = `${eventName}:success:${requestId}`
        let failedEvent = `${eventName}:failed:${requestId}`

        let person = msg.data.person

        let id = parseInt(msg.data.id, 10)
        /* error checking parameter */
        if (id <= 0 || isNaN(id)){
            redisConn.emit(failedEvent, {
                requestId,
                eventName,
                data: {
                    message: 'Invalid value for ID',
                    errorCode: 400
                }
            })
        }

        let err;
        for (let key in person)
            if (!required_keys.includes(key)){
                err = `${key} is an invalid property for a person!`
                break
            }
        if (person.id)
            err = `Cannot update 'id' field!`

        let updated = false;
        let newPerson;
        for (let i = 0; i < data.length; i++)
            if (data[i]['id'] == id) {
                for (let key in person)
                    data[i][key] = person[key]
                newPerson = data[i]
                updated = true
                break
            }

        redisConn.emit((err || !updated) ? failedEvent : successEvent, {
            requestId,
            eventName,
            data: (err || !updated) ? {message: err || `Person with id ${id} not found`, errorCode: err ? 400: 404} : newPerson
        })
    })


})()


