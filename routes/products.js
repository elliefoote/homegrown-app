var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const { STRIPE_SECRET_KEY } = require('../config');
const stripe = require('stripe')(STRIPE_SECRET_KEY);

// Get all stripe products
router.get("/stripe", async (req, res) => {
    try {
      let result = await stripe.products.list({
        limit: 100,
      });
      if (!result) {
        res.status(404).send({ error: "No products found!" });
      } else {
        res.send(result.data);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Edit stripe product

router.post("/stripe/:productid", async (req, res) => {
    let productid = req.params.productid;
    let { name, description, img1, category, price, listedby } = req.body;
    try {
        await stripe.products.update(
            productid,
            {
                name: name,
                description: description,
                images: [img1],
                metadata: {
                    listedby: listedby,
                    category: category,
                    price: price
                }
            }
          );
        let result = await stripe.products.list({
            limit: 100,
          });
        let products = result.data;
        res.status(201).send(products);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Delete stripe product

router.delete("/stripe/:productid", async (req, res) => {
    let productid = req.params.productid;
    try {
        await stripe.products.del(productid);
        let result = await stripe.products.list({
            limit: 100,
        });
        let products = result.data;
        res.status(201).send(products);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });


/* GET all products */
router.get('/', function(req, res, next) {
    db(`SELECT p.*, s.username 
        FROM products as p
        JOIN sellers AS s ON p.listedby = s.sellerid`)
      .then(results => {
        res.send(results.data);
      })
      .catch(err => res.status(500).send(err));
  });


// Get product by ID

router.get("/:productid", async (req, res) => {
    let id = req.params.productid;
    let sqlCheckID = `SELECT p.*, s.shopname FROM products as p JOIN sellers AS s ON p.listedby = s.sellerid WHERE productid = ${id}`;
    try {
      let result = await db(sqlCheckID);
      if (result.data.length === 0) {
        res.status(404).send({ error: "Product not found!" });
      } else {
        res.send(result.data[0]);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Add new product

router.post("/", async (req, res) => {
    let { name, description, imgurl, category, price, listedby } = req.body;
      try {
        // First, create the product id and price id using the Stripe API
        let stripeProd = await stripe.products.create({name: name, images: [imgurl]});
        let productid = stripeProd.id;
        let stripePrice = await stripe.prices.create(
          {
            product: productid,
            unit_amount: price,
            currency: 'eur',
          }); 
        let priceid = stripePrice.id;
        // Second, create the product in our database using the info inputted in the form and the new Stripe API ids
        let sql = `insert into products (name, description, imgurl, category, price, listedby, stripe_prodid, stripe_priceid) 
              values ('${name}', '${description}', '${imgurl}', '${category}', ${price}, ${listedby}, '${productid}', '${priceid}')`;
        await db(sql);
        let result = await db(`SELECT p.*, s.username 
        FROM products as p
        JOIN sellers AS s ON p.listedby = s.sellerid`);
        let products = result.data;
        res.status(201).send(products);
    } 
    catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Edit product

router.put("/:productid", async (req, res) => {
    let id = req.params.productid;
    let { name, description, imgurl, category, price, listedby } = req.body;
    let sqlCheckID = `SELECT * from products WHERE productid = ${id}`;
    let sqlUpdate = `
    UPDATE products SET 
    name = '${name}',    
    description = '${description}',
    imgurl = '${imgurl}', 
    category = '${category}',
    price = ${price},
    listedby = ${listedby}
    WHERE productid = ${id};
    `;
    try {
      let result = await db(sqlCheckID);
      if (result.data.length === 0) {
        res.status(404).send({ error: "Product not found!" });
      } else {
        await db(sqlUpdate);
        let result = await db(`SELECT p.*, s.username 
        FROM products as p
        JOIN sellers AS s ON p.listedby = s.sellerid`)
        let products = result.data;
        res.status(201).send(products);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Delete product

// router.delete("/:productid", async (req, res) => {
//     let id = req.params.productid;
//     let sqlCheckID = `SELECT * FROM products WHERE productid = ${id}`;
//     let sqlDelete = `DELETE FROM products WHERE productid = ${id}`;
//     try {
//       let result = await db(sqlCheckID);
//       if (result.data.length === 0) {
//         res.status(404).send({ error: "Product not found!" });
//       } else {
//         await db(sqlDelete);
//         let result = await db(`SELECT p.*, s.username 
//         FROM products as p
//         JOIN sellers AS s ON p.listedby = s.sellerid`);
//         let products = result.data;
//         res.status(201).send(products);
//       }
//     } catch (err) {
//       res.status(500).send({ error: err.message });
//     }
//   });

module.exports = router;