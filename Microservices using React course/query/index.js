const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.post('/events', (req, res) => {
    const { type, data } = req.body
    console.log('Event fron query service' + req.body)

    if (type === 'PostCreated') {
        const { id, title } = data
        posts[id] = { id, title, comments: [] }
    }


    if (type === 'CommentCreated') {
        const { postId, id, content, status } = data
        posts[postId].comments.push({ id, content, status })
    }

    console.log(posts)
    res.send({ status: "Ok" })
})


app.get('/posts', (req, res) => {
    res.send(posts)
})

app.listen(4002, () => {
    console.log('listening to query service at 4002')
})
