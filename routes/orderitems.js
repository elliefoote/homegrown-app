var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET all orderitems */
router.get('/', function(req, res, next) {
    db(`SELECT * from orderitems`)
      .then(results => {
        res.send(results.data);
      })
      .catch(err => res.status(500).send(err));
  });


// Get order items by order ID

router.get("/:orderid", async (req, res) => {
    let id = req.params.orderid;
    let sqlCheckID = `SELECT * from orderitems WHERE orderid = ${id}`;
    try {
      let result = await db(sqlCheckID);
      if (result.data.length === 0) {
        res.status(404).send({ error: "Order not found!" });
      } else {
        res.send(result.data);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Add new order item

router.post("/", async (req, res) => {
    let { orderid, orderprice, orderquantity, productid } = req.body;
      try {
        let sql = `insert into orderitems (orderid, orderprice, orderquantity, productid) values (${orderid}, ${orderprice}, ${orderquantity}, ${productid})`;
        await db(sql);
        let result = await db(`SELECT * from orderitems`);
        let orderitems = result.data;
        res.status(201).send(orderitems);
    } 
    catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

module.exports = router;