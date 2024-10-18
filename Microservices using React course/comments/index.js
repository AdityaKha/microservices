const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const app = express()
const comments = {}

app.use(bodyParser.json())

app.get('/posts/:id/comments', (req,res) =>{
    console.log(req.query)
    console.log(req.params)
    res.send(comments)
})

app.post('/posts/:id/comments', (req,res) =>{
    const id = crypto.randomBytes(4).toString('hex')
    const {title} = req.body
    comments[id] = {
        id, title
    }

    res.status(201).send(comments[id])
})


app.listen(5000,()=> {
    console.log('listen')
})
