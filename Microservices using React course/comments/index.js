const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const crypto = require('crypto')
const app = express()
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

app.post('/posts/:id/comments', (req, res) => {
    const commentId = crypto.randomBytes(4).toString('hex')
    const { content } = req.body
    const postId = req.params.id
    const comments = commentsByPostId[postId] || []
    comments.push({ commentId, content })

    commentsByPostId[postId] = comments

    res.status(201).send(commentsByPostId)
})


app.listen(5000, () => {
    console.log('listen')
})
