const router = require("express").Router()
const db = require("./db")

//return the amount of the orders.
router.get('/amount',(req,res)=>{
    db.query("SELECT COUNT(*) as count from orders",(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }
        res.json(result[0].count)
    })
})
//middleware for calc the price of the cart.
const calcPrice = (req,res,next) =>{
    db.query(`SELECT cart_items.price 
    FROM cart_items
    WHERE cart_items.cart_id="${req.body.cart_id}"`,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }
        let sum=0
        
        result.forEach(element => {
            sum=sum+element.price
        });
        
       req.price = sum
       next()
    })
}


//add new order to the db
router.post('/new',calcPrice,(req,res)=>{
    let {cart_id,city,street}=req.body
    db.query(`INSERT INTO store_db.orders (cart_id,price,city,street) VALUES ("${cart_id}","${req.price}","${city}","${street}");`,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }
        res.sendStatus(200)
    })
})


//return the orders of user by his id.
router.get('/:id',(req,res)=>{
    db.query(`SELECT orders.id,orders.cart_id,orders.price,orders.city,orders.street FROM orders
        INNER JOIN cart
        ON cart.id = orders.cart_id
        WHERE cart.costumer_id = "${req.params.id}"`,(err,result)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }
        res.json(result)
    })
})


//get the ticket for order by id of the order
router.get('/receipt/:id',(req,res)=>{
    db.query(`SELECT users.id,users.name,users.email, orders.id,orders.price,orders.city,orders.street from users,orders 
    INNER JOIN cart
    on orders.cart_id = cart.id
    where orders.id = ${req.param.id} and cart.costumer_id = users.id`,
    (req,res)=>{
        if(err){
            res.sendStatus(400)
            throw err
        }
        res.json(result)
    })
})


module.exports = router