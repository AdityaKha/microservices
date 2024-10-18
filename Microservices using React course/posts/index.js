const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const app = express()
const posts = {}

app.use(bodyParser.json())

app.get('/posts', (req,res) =>{
    res.send(posts)
})

app.post('/posts', (req,res) =>{
    const id = crypto.randomBytes(4).toString('hex')
    const {title} = req.body
    posts[id] = {
        id, title
    }

    res.status(201).send(posts[id])
})


app.listen(4000,()=> {
    console.log('listen')
})
