const router = require('express').Router()
const db = require('./db')
const session = require('express-session');
const uuid = require('uuid/v4');

router.use(session({
    genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  cookie: {
    "secure": false
    },
    secret: "Shh, its a secret!",
}));



const existUser = (req,res,next) =>{
    const q = `SELECT * FROM users WHERE username ="${req.body.username}"`
    db.query(q,(err,result)=>{
        if(err){res.sendStatus(401);throw err;}
        if(result.length===1){
            req.result = true
        }
        else
            req.result = false
        next()
    })
}

router.post('/register',existUser,(req,res)=>{
    if(req.result) res.sendStatus(409) // conflict
    else{
        let q = `INSERT INTO users (username,f_name,l_name,password) VALUES ("${req.body.username}","${req.body.f_name}","${req.body.l_name}","${req.body.password}")`
        db.query(q,(err,result)=>{
            if(err){res.sendStatus(401);throw err}
            else{
               
                res.sendStatus(200);
            }
        })
    }
})

router.get('/login',(req,res)=>{
    if(req.session.username) {
        res.json({'username':req.session.username})
    }
    else {
        res.sendStatus(403)
    }
})

router.post('/login',existUser,(req,res)=>{
    let q = `SELECT * FROM users WHERE username="${req.body.username}"`
    if (!req.result) res.status(403).send("not exist user")
    db.query(q,(err,result)=>{
        if(err){res.sendStatus(401);throw err}
        else{
            
            if(result[0]['password']==req.body.password)
            {
                if(!req.session.username) {
                    req.session.username = result[0]['username']
                    req.session.save();
                    res.send(req.session)
                }
                else{
                    req.session.regenerate(function(err) {
                        req.session.username = result[0]['username']
                        res.sendStatus(200)
                    })
                }
            }
            else{
                res.sendStatus(403);
            }
        }
    })
})


router.get('/isadmin/:username',(req,res)=>{
    const q = `SELECT admin FROM users WHERE username ="${req.params.username}"`
    db.query(q,(err,result)=>{
        if(err){res.sendStatus(401);throw err;}
        if(result.length===1){
            res.send({admin:result[0].admin})
        }
        else
            res.sendStatus(401)
    })
})
module.exports = router