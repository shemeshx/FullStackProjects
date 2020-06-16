const mysql = require('mysql')
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: '1234',
    database:'store_db',
    timezone: 'gmt'
})
conn.connect(err=>{
    if(err) throw err
    else
        console.log("connected")
})
module.exports = conn;