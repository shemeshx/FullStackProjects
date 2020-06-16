const router = require("express").Router()
const db = require("./db")


//get cart id from costumer id that hasn't order yet
router.get("/getid/:id",(req,res)=>{
    db.query(`SELECT cart_id FROM cart,orders WHERE cart.costumer_id = "${req.params.id}" AND cart.id <> orders.cart_id`,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }else{
            res.send(result[0])
        }
    })
})

// CHECKING IF LOGED USER HAS AN ORDER
router.get("/order/:id",(req,res)=>{
    // selecting data from orders about loged user
    let q=`SELECT  cart.id, orders.cart_id
    FROM cart
    INNER JOIN orders
    ON cart.id=orders.cart_id
    WHERE cart.costumer_id="${req.params.id}"`
    db.query(q,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }else{
            if(result.length>0){
                res.send(true)
            }else{
                res.send(false)
            }
        }
    })  
})


router.post("/new",(req,res)=>{
    db.query(`INSERT INTO store_db.cart (costumer_id,date_of_creation) VALUES ("${req.body.id}","${req.body.date}");`,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }
        res.sendStatus(200)
    })
})

router.post("/add",(req,res)=>{
    console.log(req.body);
    db.query(`SELECT price FROM item WHERE id = "${req.body.item_id}"`,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }
        let price = result[0].price
        //check if already exsits
        db.query(`SELECT * FROM cart_items WHERE item_id="${req.body.item_id}" and cart_id="${req.body.cart_id}"`,(err,result)=>{
            if(result.length==0)
                //add new row if not exists
                db.query(`INSERT INTO cart_items (item_id,amount,price,cart_id) VALUES (${req.body.item_id},${req.body.amount},${req.body.amount*price},${req.body.cart_id})`,(err,result)=>{
                    if(err){
                        res.sendStatus(400)
                        throw err
                    }
                    res.sendStatus(200)
                })
            else{
                //add new row if not exists
                db.query(`UPDATE cart_items
                          SET
                          amount = ${req.body.amount},
                          price = ${req.body.amount*price}
                          WHERE item_id="${req.body.item_id}" and cart_id="${req.body.cart_id}"`,(err,result)=>{
                    if(err){
                        res.sendStatus(400)
                        throw err
                    }
                    res.sendStatus(200)
                })
            }    
        })
        
    })
})

router.get("/:id",(req,res)=>{
    db.query(`SELECT item.id,item.name, cart_items.amount, cart_items.price
                FROM cart_items
                INNER JOIN item
                ON cart_items.item_id=item.id
                INNER JOIN cart
                ON cart_items.cart_id=cart.id
                WHERE cart.costumer_id="${req.params.id}"`,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }
        res.json(result)
    })
})


router.get("/price/:id",(req,res)=>{
    db.query(`SELECT cart_items.price 
    FROM cart_items
    INNER JOIN item
    ON cart_items.item_id=item.id
    WHERE cart_items.cart_id="${req.params.id}"`,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }
        let sum=0
        result.forEach(element => {
            sum=sum+element.price
        });
        res.json(sum)
    })
})

//remove item/items from cart
router.delete("/:id",(req,res)=>{
    if(req.body.item_id){//remove item by id
        db.query(`DELETE FROM cart_items where cart_id=${req.params.id} and item_id=${req.body.item_id}`,(err,result)=>{
            if(err){
                res.sendStatus(400)
                throw err
            }
            res.sendStatus(200)
        })
    }else{//remove all items
        db.query(`DELETE FROM cart_items where cart_id=${req.params.id}`,(err,result)=>{
            if(err){
                res.sendStatus(400)
                throw err
            }
            res.sendStatus(200)
        })
    }
})
module.exports = router