const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')

app.use(bodyParser.json())

app.post('/events', (req, res) => {
    const event = req.body

        // posts service
    axios.post('http://localhost:4000/events', event)
    // comments service
    axios.post('http://localhost:5000/events', event)
    // query service
    axios.post('http://localhost:4002/events', event)
    // moderation service
    axios.post('http://localhost:4003/events', event)


    res.send({ status: "Ok" })
})


app.listen(4005, () => {
    console.log('listening on 4005')
})