require('dotenv').config()
const fetch = require('isomorphic-unfetch')
const redisConn = require('./utils/redis-conn')

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || "enter key here";
const PIXABAY_API_URL = "https://pixabay.com/api/";
const NUM_RESULTS = 4;

(async () => {
    console.log("🛠  Worker started")
    /* GET query response from pixabay */
    redisConn.on('research:request:*', async (message, chan) => {
        const { requestId, eventName, data } = message
        const { query } = data

        let successEvent = `${eventName}:success:${requestId}`
        let failedEvent = `${eventName}:failed:${requestId}`

        try {
            const researchResult = await fetch(
                `${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&q=${query.replace(' ', '+')}&per_page=${NUM_RESULTS}`
            )
            console.log("sent request to Pixabay API")
            redisConn.emit(successEvent, {
                requestId,
                eventName,
                data : {
                    researchResult : await researchResult.json()
                }
            })
        } catch (err) {
            console.log("request to Pixabay API failed")
            redisConn.emit(failedEvent, {
                requestId,
                eventName,
                data : {
                    message: "Request to Pixabay API failed",
                    errorCode: 500
                }
            })
        }
    })
})()
