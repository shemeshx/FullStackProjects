const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const db = require('./dal/dbconnection')
const router = require('./routes/index')
app.use(cors());
app.use("/",router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})