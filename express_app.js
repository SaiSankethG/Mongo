const mongoose = require('mongoose')
const express = require('express')
const app = new express()
const morgan = require('morgan')
const { urlencoded, json } = require('body-parser')

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        minimumLength:10
    }
})
const Note = mongoose.model('note' , noteSchema)

app.use(morgan('dev'))
app.use(json())
app.use(urlencoded({extended:true}))

app.get('/' , async(req, res)=>{
    const notes = await Note.find({}).exec()
    res.status(200).json(notes)
})

app.post('/note', async(req, res)=>{
    const noteCreated = req.body
    const note = await Note.create(noteCreated)
    res.status(200).json(note)
})

const connect = (connection => {
    return mongoose.connect('mongodb+srv://sai:sai@cluster0.7cuwm0r.mongodb.net/?retryWrites=true&w=majority')
})

connect()
.then(async connection =>{
    app.listen(5000)
})
.catch(err => console.log(err))