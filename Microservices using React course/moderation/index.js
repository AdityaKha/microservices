const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()

app.use(bodyParser.json())

const posts = {}

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    console.log(req.body)
    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approve'

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated', data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
    }

    res.send({ status: "Ok" })
})


app.get('/posts', (req, res) => {
    res.send(posts)
})

app.listen(4003, () => {
    console.log('listening to moderation service at 4003')
})
