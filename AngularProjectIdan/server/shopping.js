const router = require('express').Router()
const db = require('./db')

router.post('/cart', async (req, res) => {
    let q = `INSERT INTO cart (customer_id) VALUES (${req.body.customer_id})`
    try {
        const result = await db(q)
        console.log(result);
        res.status(200).send(result)
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }
})

router.post('/cart/delete', async (req, res) => {
    const q = `DELETE FROM cart WHERE customer_id="${req.body.customer_id}"`

    try {
        const result = await db(q)
        console.log(result);
        res.status(200).send(result)
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }
})

router.get('/cart/:id', async (req, res) => {
    const q = `SELECT * FROM cart WHERE customer_id ="${req.params.id}"`
    try {
        const result = await db(q)
        console.log(result);
        if (result[0]) {
            const { id, customer_id, date_created } = result[0]
            res.status(200).send({ id, customer_id, date_created })
        }
        else {

            res.status(401).send('no cart found')

        }
    }
    catch (err) {
        res.sendStatus(401);
        console.log(err);
    }
})


router.post('/cart/item', async (req, res) => {
    let weighted_price;
    let q = `select
 products.price 
from products where products.id=${req.body.product_id} `
    try {
        const product = await db(q)
        console.log(product);
        weighted_price = product[0].price * req.body.count
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }
    let sq = `INSERT INTO cart_item (product_id,cart_id,count,weighted_price) VALUES (${req.body.product_id},${req.body.cart_id},${req.body.count},${weighted_price})`

    try {
        const result = await db(sq)
        console.log(result);
        res.sendStatus(200);
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }

})

router.get('/cart/items/:cart_id', async (req, res) => {
    let q = `SELECT
    cart_item.count,
    cart_item.weighted_price,
    products.id,
     products.product_name, 
    products.img
     FROM cart_item
     INNER JOIN products 
   ON cart_item.product_id = products.id
   where cart_item.cart_id=${req.params.cart_id}`

    try {
        const result = await db(q)
        console.log(result);
        res.status(200).json(result);
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }

})

router.post('/cart/items/delete', async (req, res) => {
    const q = `DELETE FROM cart_item WHERE cart_id="${req.body.cart_id}" AND product_id="${req.body.product_id}"`
    try {
        const result = await db(q)
        console.log(result);
        res.status(200).json(result);
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }

})

router.post('/cart/items/delete/all', async (req, res) => {
    const q = `DELETE FROM cart_item WHERE cart_id="${req.body.cart_id}"`
    try {
        const result = await db(q)
        console.log(result);
        res.status(200).json(result);
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }

})

router.get('/products', async (req, res) => {
    let q = `SELECT * FROM shoppingdb.products;`
    try {
        const result = await db(q)
        console.log(result);
        res.status(200).json(result);
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }
})

router.get('/products/:category', async (req, res) => {
    let q = `SELECT * FROM shoppingdb.products where products.category_id=${req.params.category} ;`
    try {
        const result = await db(q)
        console.log(result);
        res.status(200).json(result);
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }
})

router.get('/categories', async (req, res) => {
    let q = `SELECT * FROM shoppingdb.categories;`
    try {
        const result = await db(q)
        console.log(result);
        res.status(200).json(result);
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }
})

router.get('/cart/count/:cart_id', async (req, res) => {
    let q = `SELECT COUNT(id) AS count FROM cart_item WHERE cart_id="${req.params.cart_id}"`
    try {
        const result = await db(q)
        console.log(result);
        res.json({ count: result[0].count })
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }

})

router.get('/cart/sum/:cart_id', async (req, res) => {
    let q = `SELECT SUM(weighted_price) AS price FROM cart_item WHERE cart_id=${req.params.cart_id}`
    try {
        const result = await db(q)
        console.log(result);
        res.json({ final_price: result[0].price })
    }
    catch (err) {
        res.sendStatus(401);
        throw err
    }
})

router.post('/order', async (req, res) => {
    let q = `INSERT INTO orders (cart_id,customer_id,final_price,order_date,credit_last_num,city,street) VALUES (${req.body.cart_id},${req.body.customer_id},${req.body.final_price},"${req.body.order_date}",${req.body.credit_last_num},"${req.body.city}","${req.body.street}")`
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

router.get('/order/:customer_id', async (req, res) => {
    let q = `SELECT * FROM orders where customer_id=${req.params.customer_id};`

    try {
        const result = await db(q)
        console.log(result);
        res.status(200).json(result[0])
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }
})


router.post('/order/check', async (req, res) => {
    let q = `SELECT * FROM orders where order_date ="${req.body.order_date}" ;`
    try {
        const result = await db(q)
        console.log(result.lenght);
        if (result.lenght < 3 || result.lenght === undefined) {
            res.status(200).json(result[0])
        }
        else {
            res.status(200).json({ msg: 'Please choose another date.' })
        }
    }
    catch (err) {
        res.sendStatus(401);
        throw err

    }
})


router.post('/products', async (req, res) => {
    let q = `INSERT INTO products (product_name,category_id,price,img)
    VALUES ("${req.body.product_name}",${req.body.category_id},${req.body.price},"${req.body.img}")`
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

router.post('/products/update', async (req, res) => {
    let q = `UPDATE products 
    SET 
    product_name ="${req.body.product_name}",
    category_id=${req.body.category_id},
    price=${req.body.price},
    img="${req.body.img}"
    WHERE 
       id = ${req.body.id}
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

module.exports = router

