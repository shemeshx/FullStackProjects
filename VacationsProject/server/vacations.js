const router = require('express').Router()
const db = require('./db')
const uuidv4 = require('uuid/v4');
router.get('/username/:username',(req,res)=>{
    let q = `select vacations.id,vacations.desteny,vacations.description,vacations.pic_url,vacations.start_date,vacations.end_date,vacations.price,vacations.added_date from vacations,followers where vacations.id = followers.vacation_id and followers.username = "${req.params.username}"
               union 
               select vacations.id,vacations.desteny,vacations.description,vacations.pic_url,vacations.start_date,vacations.end_date,vacations.price,vacations.added_date from vacations, followers where followers.username = "${req.params.username}" and vacations.id <> followers.vacation_id`
    db.query(q,(err,result)=>{
        if(err) {res.sendStatus(401);throw err}
        else{
            if (result.length==0){
                q = `SELECT * FROM VACATIONS`
                db.query(q,(err,result)=>{
                    if(err) {res.sendStatus(401);throw err}
                    res.json(result)
                })
            }
            else{
               
                res.json(result)
            }
        }
    })
})

router.get('/id/:id',(req,res)=>{
    const q = `SELECT * FROM vacations where id = "${req.params.id}"`
    db.query(q,(err,result)=>{
        if(err) {res.sendStatus(401);throw err}
        else{
          
            res.json(result[0])
        }
    })
})

router.post('/',(req,res)=>{
    const id = uuidv4();
    let q = `INSERT INTO vacations (id,desteny,description,pic_url,start_date,end_date,price) VALUES ("${id}","${req.body.desteny}","${req.body.description}","${req.body.pic_url}","${req.body.start_date}","${req.body.end_date}",${req.body.price})`
    db.query(q,(err,result)=>{
        if(err) {res.sendStatus(401);throw err}
        else{
            res.sendStatus(200)
        }
    })

    q = `SELECT * FROM vacations WHERE id = "${id}"`
    db.query(q,(err,result)=>{
        if(err) {res.sendStatus(401);throw err}
        else{
            res.json(result[0])
        }
    })

})

router.put('/:id',(req,res)=>{
   
    let q =`UPDATE vacations 
     SET 
        desteny ="${req.body.desteny}",
        description="${req.body.description}",
        pic_url="${req.body.pic_url}",
        start_date="${req.body.start_date}",
        end_date="${req.body.end_date}",
        price=${req.body.price} 
     WHERE 
        id = "${req.params.id}"
     `
    db.query(q,(err,result)=>{
        if(err) {res.sendStatus(401);throw err}
        else{
            res.sendStatus(200);
        }
    })

})


router.delete('/:id',(req,res)=>{
   
    let q =`DELETE FROM followers WHERE vacation_id="${req.params.id}"`
    db.query(q,(err,result)=>{
        if(err) {res.sendStatus(401);throw err}
        else{
            let q =`DELETE FROM vacations WHERE id="${req.params.id}"`
            db.query(q,(err,result)=>{
                if(err) {res.sendStatus(401);throw err}
                else{
                    
                    res.sendStatus(200);
                }
            })
        
        }
    })

})

module.exports = router