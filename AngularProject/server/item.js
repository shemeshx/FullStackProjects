const router = require("express").Router()
const db = require("./db")


// GET AMOUNT OF ALL ITEMS  AVAILABLE IN STORE
router.get("/amount", (req, res) => {
    // counting items
    let q = `SELECT COUNT(item_name) FROM item`
    db.query(q, (err, result) => {
        if (err) {
            res.sendStatus(404)
            throw err
        } else {
            res.json(result)
        }
    })
})
// GET all categories
router.get("/categories", (req, res) => {
   
    let q = `SELECT name FROM store_db.categories;`
    db.query(q, (err, result) => {
        if (err) {
            res.sendStatus(404)
            throw err
        } else {
            res.json(result)
        }
    })
})
// GET AMOUNT OF ALL ITEMS  AVAILABLE IN STORE
router.get("/all", (req, res) => {
    // counting items
    let q = `SELECT * FROM item`
    db.query(q, (err, result) => {
        if (err) {
            res.sendStatus(404)
            throw err
        } else {
            res.json(result)
        }
    })
})

// GET SEARCH RESULT
router.get("/search/:q", (req, res) => {
    // checking if search result exist in item 
    let q = `SELECT * FROM item
    WHERE item_name LIKE '%${req.params.q}%';`
    db.query(q, (err, result) => {
        if (err) {
            res.sendStatus(404)
            throw err
        } else {
            res.json(result)
        }
    })
})

// GET ITEM BY CATEGORY
router.get("/:category", (req, res) => {
    // joining item with the right category
    let q = `SELECT item.id,item.name,item.price, item.image_url
    FROM item
    INNER JOIN categories
    ON item.category_id=categories.id
    WHERE categories.name="${req.params.category}"`
    db.query(q, (err, result) => {
        if (err) {
            res.sendStatus(404)
            throw err
        } else {
            console.log(result);
            res.json(result)
        }
    })
})



// -------------------------------------------ADMIN REQWEST--------------------------------------------


// ADD NEW ITEM
router.post("/admin/add", (req, res) => {
    let { name, category, price, image } = req.body
    if (name && category && price && image) {
        // inserting new item to items table
        let q = `INSERT INTO item(item_name,category_id,price,image_url)
    VALUES("${name}",${category},"${price}","${image}")`
        db.query(q, (err, result) => {
            if (err) {
                res.sendStatus(404)
                throw err
            } else {
                res.json(result)
            }
        })
    }

})

//UPDATE ITEM
router.put("/update/:id", (req, res) => {
    let { name, price, image } = req.body
    if (name && price && image) {
        // updating changes 
        let q = `UPDATE item
        SET 
        item.item_name='${name}',
         item.price=${price},
        item.image_url='${image}'
        WHERE item.id=${req.params.id}`
        db.query(q, (err, result) => {
            if (err) {
                res.sendStatus(404)
                throw err
            } else {
                res.json(result)
            }
        })
    }

})

module.exports = router