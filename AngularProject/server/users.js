const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('./db')


// MIDDLE FUNCTION FOR CHECKING IF ADMIN OR USER
const checkAdmin = (req, res, next) => {
    if(req.body.email==undefined || req.body.password==undefined)
        next()
    const q = `SELECT * FROM users WHERE users.email="${req.body.email}"`
    db.query(q, (err, result) => {
        if (err) {
            res.sendStatus(401)
            throw err
        } else {
            if(result.length>0){
                if (result[0].manager) 
                    req.admin = true
                else
                    req.admin = false
            }
            
        }
        next()
    })
}


router.post('/login',checkAdmin,(req,res)=>{
    if(req.body.email != undefined && req.body.password != undefined){ // if the user try to login
        const {email,password} = req.body
        db.query(`SELECT * FROM USERS WHERE email="${email}" and password="${password}"`,(err,result)=>{
            if(err)
            {
                res.sendStatus(500).status(err)
            }
            else{
                if(result.length!=0){
                    jwt.sign({email:req.body.email},"shhhh",{expiresIn:"30m"},(err,token)=>{
                        if(err)
                        {
                            res.sendStatus(500).status(err)
                        }
                      
                        res.send({token:token,admin:req.admin,email:result[0].email,id:result[0].id})
                    })
                }
                else{
                    res.sendStatus(403)
                }  
            }       
        })
    }
    else{ //if get a token to verify
        if(req.body.token){
            jwt.verify(req.body.token, "shhhh", function(err, decoded) {
                if(err)
                {
                    res.sendStatus(500).status(err)
                }  
                if(decoded.email==undefined)
                {
                    res.sendStatus(403)
                }
                else{
                    db.query(`SELECT * FROM USERS WHERE email="${decoded.email}"`,(err,result)=>{
                        res.send({admin:result[0].manager,email:result[0].email,id:result[0].id})
                    })
                }
              });
        }
    }
})

router.post('/register',(req,res)=>{
    db.query(`SELECT email,id FROM users WHERE users.email="${req.body.email}" or users.id="${req.body.id}"`,(err,result)=>{
        if(err)
            res.status(500).send(err) 
        else if (result.length===0)
        db.query(`INSERT INTO users (id,name,email,password,city,street) VALUES 
                                ("${req.body.id}","${req.body.name}","${req.body.email}","${req.body.password}","${req.body.city}","${req.body.street}")`,
            (err,result)=>{
                if(err)
                    res.status(500).send(err)
                else
                    res.sendStatus(200)
            }
        )
        else
            res.sendStatus(500)
    })
})

module.exports = router