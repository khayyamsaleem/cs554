const https = require('https')
const fs = require('fs')
const path = require('path')

const DUMMY_DATA_URL = 'https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json'
const DUMMY_DATA_DEST_DIR = "data"
const DUMMY_DATA_FILE_NAME = "dummyData.json"
const WORKER = "./worker.js"

const dataRequest = https.get(DUMMY_DATA_URL)

dataRequest.on('response', res => {
    if (res.statusCode == 200)
        res
            .pipe(fs.createWriteStream(path.join(DUMMY_DATA_DEST_DIR, DUMMY_DATA_FILE_NAME)))
            .on('close', () => console.log("File downloaded."))
    else console.log("File not available, queries will not work.")
    }, err => console.log(err));

