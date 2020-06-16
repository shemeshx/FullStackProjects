const router = require('express').Router()
const db = require('./db')

router.get('/:id',(req,res)=>{
    const q = `SELECT COUNT(*) FROM followers WHERE vacation_id = "${req.params.id}"`
    db.query(q,(err,result)=>{
        if(err){res.send(401);throw err;}
        res.json(result[0]['COUNT(*)'])
    })
})

router.get('/',(req,res)=>{
    const q = `SELECT COUNT(followers.username) as followers,vacations.desteny 
    FROM vacations LEFT JOIN
        followers on followers.vacation_id = vacations.id
    GROUP BY vacations.id;`
    db.query(q,(err,result)=>{
        if(err){res.send(401);throw err;}
        res.json(result)
    })
})
router.get('/:username/:id',(req,res)=>{
    const q = `SELECT * FROM followers WHERE vacation_id = "${req.params.id}" AND username = "${req.params.username}"`
    console.log(q);
    db.query(q,(err,result)=>{
        if(err){res.send(401);throw err;}
        if(result.length >0)
            res.json({result:true})
        else
            res.json({result:false})
    })
})

router.post('/follow',(req,res)=>{
    const q = `INSERT INTO followers (vacation_id,username) VALUES ("${req.body.vacation_id}","${req.body.username}")`
    db.query(q,(err,result)=>{
        if(err){res.send(401);throw err;}
        res.send(200)
    })
})
router.delete('/unfollow',(req,res)=>{
    const q = `DELETE FROM followers WHERE vacation_id="${req.body.vacation_id}" AND username="${req.body.username}"`
    db.query(q,(err,result)=>{
        if(err){res.send(401);throw err;}
        res.send(200)
    })
})

module.exports = router