require('dotenv').config()

const express = require('express')
const imageRoutes = require('../backend/Routes/Imagerouter')
const mongoose =require('mongoose')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/Images', imageRoutes)

mongoose.connect(process.env.MONG_URI)
.then(() => {})
.catch((error) => {
    console.log(error)
})

// listen for requests
app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT)
})