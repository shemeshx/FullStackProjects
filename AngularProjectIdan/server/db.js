const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shoppingDB',
    timezone: 'gmt'
})

db.connect(err => {
    if (err) throw err
    else
        console.log("Connect to MySql DB!")
})

function Query(q) {
    return new Promise((resolve, reject) => {
        db.query(q, (err, results) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(results)
            }
        })
    })
}
module.exports = Query;

