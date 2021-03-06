const express = require('express')
const cors = require('cors')
const app = express()
const users = require('./users')
const vacations = require('./vacations')
const followers = require('./followers')
app.use(cors({credentials: true, origin: true}))


app.use(express.json())

app.use('/users',users)
app.use('/vacations',vacations)
app.use('/followers',followers)



//app.use(express.static(__dirname+`/build`))
// app.use('/',(req,res)=>{
//     res.send("index.html")
// })

app.listen(3000,()=>{console.log("start server...");})