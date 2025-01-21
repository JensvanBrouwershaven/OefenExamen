require('dotenv').config()

const express = require('express')
const imageRoutes = require('./Routes/Imagerouter')
const mongoose = require('mongoose')

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

// connect to MongoDB
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  })

// listen for requests
app.listen(process.env.PORT || 4000, () => {
  console.log('listening on port', process.env.PORT)
})
