const router = require('express').Router()
const db = require('./db')

router.put('/products/:id', async (req, res) => {
    let q = `UPDATE products 
     SET 
        product_name ="${req.body.product_name}",
        category_id="${req.body.category_id}",
        price="${req.body.pprice}",
        img="${req.body.img}"
     WHERE 
        id = "${req.params.id}"
     `
    try {
        const result = await db(q)
        console.log(result);
        res.sendStatus(200);
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }


})

router.post('/products', async (req, res) => {
    let q = `INSERT INTO orders (product_name ,category_id,price,img) VALUES ("${req.body.product_name}","${req.body.category_id}","${req.body.price}","${req.body.img}")`
    try {
        const result = await db(q)
        console.log(result);
        res.sendStatus(200);
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }
})

module.exports = router