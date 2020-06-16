const express = require('express')
const cors = require('cors')
const app = express()
const users = require('./users')
const shopping = require('./shopping')

app.use(cors({credentials: true, origin: true}))
app.use(express.json())

app.use('/users',users)
app.use('/shopping',shopping)

app.listen(3000,()=>{console.log("start server...");})

