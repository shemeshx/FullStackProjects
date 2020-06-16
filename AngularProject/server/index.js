const express = require('express')
const cors = require('cors')
const app = express()
const users = require('./users')
const item = require('./item')
const carts = require('./carts')
const orders = require('./orders')

app.use(cors({credentials: true, origin: true}))


app.use(express.json())

app.use('/users',users)
app.use('/item',item)
app.use('/carts',carts)
app.use('/orders',orders)




//app.use(express.static(__dirname+`/build`))
// app.use('/',(req,res)=>{
//     res.send("index.html")
// })

app.listen(3000,()=>{console.log("start server...");})