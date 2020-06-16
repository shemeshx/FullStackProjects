const router = require('express').Router()
const db = require('./db')
const session = require('express-session');
const { uuid } = require('uuidv4');

router.use(session({
    genid: (req) => {
        return uuid()
    },
    cookie: {
        secure: false,
        httpOnly: false
    },
    secret: "shop",
}));


const vt = async (req, res, next) => {
    let q = `SELECT * FROM customers WHERE email ="${req.body.username}"`
    try {
        const result = await db(q)
        if (result.length === 1) {
            req.result = true
            next()
        }
        else {
            req.result = false
            next()
        }
    }
    catch (err) {
        res.sendStatus(401)
        throw err
    }

}

const vtrg = async (req, res, next) => {
    let q = `SELECT * FROM customers WHERE email ="${req.body.username}" OR id ="${req.body.id}"`
    try {
        const result = await db(q)
        if (result.length === 1) {
            req.result = true
            next()
        }
        else {
            req.result = false
            next()
        }
    }
    catch (err) {
        res.sendStatus(401)
        throw err
    }

}

router.post('/register', vtrg, async (req, res) => {
    if (req.result) res.sendStatus(409) // conflict
    else {
        let q = `INSERT INTO customers (email,f_name,l_name,password,id,city,street) VALUES ("${req.body.username}","${req.body.f_name}","${req.body.l_name}","${req.body.password}","${req.body.id}","${req.body.city}","${req.body.street}")`

        try {
            const result = await db(q)
            console.log(result);
            res.sendStatus(200);
        }
        catch (err) {
            res.sendStatus(401);
            throw err

        }


    }
})

router.post('/confrim', async (req, res) => {
    let msg = {}
    let q = `SELECT * FROM customers WHERE email ="${req.body.username}"`
    try {
        const result = await db(q)
        console.log(result);
        if (result.length === 1) {
            msg.username = "Email already exists. try different one."
            res.send(msg)
        }
        else {
            let sq = `SELECT * FROM customers WHERE id ="${req.body.id}"`
            try {
                const sresult = await db(sq)
                if (sresult.length === 1) {
                    msg.id = "ID aleardy exist. try different one."
                    res.send(msg)
                }
                else {
                    res.sendStatus(200)
                }
            }
            catch{
                res.sendStatus(401)
                throw err
            }
        }
    }
    catch (err) {
        res.sendStatus(401)
        throw err
    }

})
router.get('/login', (req, res) => {
    console.log(req.session.username);
    if (req.session.username) {
        res.json({
            'username': req.session.username,
            'id': req.session.customer_id,
            'f_name': req.session.f_name,
            'role': req.session.role,
            'city': req.session.city,
            'street': req.session.street
        })
    }
    else {
        res.sendStatus(403)
    }
})

router.post('/login', vt, async (req, res) => {
    let q = `SELECT * FROM customers WHERE email="${req.body.username}"`
    if (!req.result) res.status(403).send("user not found")
    try {
        const result = await db(q)
        if (result[0]['password'] == req.body.password) {
            if (!req.session.username) {
                req.session.username = result[0]['email']
                req.session.customer_id = result[0]['id']
                req.session.f_name = result[0]['f_name']
                req.session.city = result[0]['city']
                req.session.street = result[0]['street']
                req.session.role = result[0]['role']
                req.session.save();
                res.send(req.session)
            }
            else {
                req.session.regenerate(function (err) {
                    req.session.username = result[0]['email ']
                    req.session.customer_id = result[0]['id']
                    req.session.f_name = result[0]['f_name']

                    res.sendStatus(200)
                })
            }

        }
        else {
            res.sendStatus(403);
        }

    }
    catch (err) {
        res.sendStatus(401);
        throw err
    }
})

router.get('/isadmin/:username', async (req, res) => {
    const q = `SELECT role FROM customers WHERE email ="${req.params.username}"`
    try {
        const result = await db(q)
        if (result[0].role === "admin") {
            res.send(true)
        }
        else {

            res.send(false)
        }
    }
    catch (err) {
        res.sendStatus(401);
        throw err;
    }
})

module.exports = router




