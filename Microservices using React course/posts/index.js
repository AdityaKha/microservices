const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const crypto = require('crypto')
const { default: axios } = require('axios')
const app = express()
const posts = {}

app.use(bodyParser.json())
app.use(cors())

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    const id = crypto.randomBytes(4).toString('hex')
    const { title } = req.body
    posts[id] = {
        id, title
    }

    await axios.post('http://localhost:4005/events', {
        type: "PostCreated",
        data: {
            id, title
        }
    })

    res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
    const event = req.body
    console.log('Event fron posts service' + req.body)
   

    res.send({ status: "Ok" })
})



app.listen(4000, () => {
    console.log('listen 4000')
})
