var express = require('express');
var router = express.Router();
const {ensureSameUser} = require('../middleware/guards');
const db = require("../model/helper");

// Add to cart

router.post("/", async (req, res) => {
    let { userid, productid, price } = req.body;
    let sql = `insert into cart (userid, productid, price, quantity, subtotal) 
              values (${userid}, ${productid}, ${price}, 1, ${price*1})`;
      try {
      await db(sql);
      let result = await db(`SELECT c.*, p.* FROM cart AS c JOIN products AS p ON c.productid = p.productid WHERE userid = ${userid}`);
      let cart = result.data;
      res.status(201).send(cart);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Edit cart

router.patch("/:userid", async (req, res) => {
    let {userid} = req.params;
    let { productid, quantity, price } = req.body;
    let sql = `UPDATE cart SET quantity = ${quantity}, subtotal = ${price*quantity} WHERE userid = ${userid} AND productid = ${productid}`;
      try {
      await db(sql);
      let result = await db(`SELECT c.*, p.* FROM cart AS c JOIN products AS p ON c.productid = p.productid WHERE userid = ${userid}`);
      let cart = result.data;
      res.status(201).send(cart);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  // Delete item from cart or empty cart

router.delete("/:userid/:productid", async (req, res, next) => {
    let {userid, productid} = req.params;
    let sqlCheckID = "";
    let sqlDelete = "";
    if (productid === "empty") {
      sqlCheckID = `SELECT * FROM cart WHERE userid = ${userid}`;
      sqlDelete = `DELETE FROM cart WHERE userid = ${userid}`;
    }
    else {
      sqlCheckID = `SELECT * FROM cart WHERE userid = ${userid} AND productid = ${productid}`;
      sqlDelete = `DELETE FROM cart WHERE userid = ${userid} AND productid = ${productid}`;
    }
    
    let sqlGetCart = `SELECT c.*, p.* FROM cart AS c JOIN products AS p ON c.productid = p.productid WHERE userid = ${userid}`;
    try {
      let result = await db(sqlCheckID);
      if (result.data.length === 0) {
          res.status(404).send({ error: "Product is not in cart!" });
        }    
      else {
            await db(sqlDelete);
            let result = await db(sqlGetCart);
            let cart = result.data;
            res.status(201).send(cart);
          }  
        }
    catch (err) {
          next(err);
      }
  });

// Get cart of logged-in user

router.get('/:userid', async function(req, res, next) {
  let {userid} = req.params;
  let sql = `SELECT c.*, p.* FROM cart AS c JOIN products AS p ON c.productid = p.productid WHERE userid = ${userid}`;
  try {
    let results = await db(sql);
    let cart = results.data;
    res.send(cart);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

module.exports = router;