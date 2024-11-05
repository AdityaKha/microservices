const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const crypto = require('crypto')
const app = express()
const axios = require('axios')
// {postId : {
//   commentId : { title : ""}
//  }
// }
const commentsByPostId = {}

app.use(bodyParser.json())
app.use(cors())

app.get('/posts/:id/comments', (req, res) => {

    if (req.params.id == 'all') {
        console.log(commentsByPostId)
        console.log(req.params.id == 'all')
        res.send(commentsByPostId)
        return
    }

    res.send(commentsByPostId[req.params.id] || [])
})

/// Creates a comment.
app.post('/posts/:id/comments', async (req, res) => {
    const commentId = crypto.randomBytes(4).toString('hex')
    const { content } = req.body
    const postId = req.params.id
    const comments = commentsByPostId[postId] || []
    comments.push({ commentId, content })

    commentsByPostId[postId] = comments

    // Event-bus 
    await axios.post('http://localhost:4005/events', {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId,
            status: 'pending'
        }
    })

    res.status(201).send(commentsByPostId)
})

app.post('/events', async (req, res) => {
    const event = req.body
    console.log('Event fron comment service')

    const { type, data } = req.body

    if (type === 'CommentModerated') {
        const { postId, id, status } = data
        const comments = commentsByPostId[postId] || []

        const comment = comments.find((v) => v === id)
        comment.status = status

        await axios.push('https://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status,
                content
            }
        })
    }


    res.send({ status: "Ok" })
})



app.listen(5000, () => {
    console.log('listen')
})
