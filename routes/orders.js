var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET all orders */
router.get('/', function(req, res, next) {
    db(`SELECT * from orders`)
      .then(results => {
        res.send(results.data);
      })
      .catch(err => res.status(500).send(err));
  });


// Get order by ID

router.get("/order/:orderid", async (req, res) => {
    let id = req.params.orderid;
    let sqlCheckID = `SELECT * from orders WHERE orderid = ${id}`;
    try {
      let result = await db(sqlCheckID);
      if (result.data.length === 0) {
        res.status(404).send({ error: "Order not found!" });
      } else {
        res.send(result.data[0]);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  // Get order(s) by user ID

router.get("/user/:userid", async (req, res) => {
    let userid = req.params.userid;
    let sqlGetOrders = `select * from orders WHERE userid = ${userid} ORDER BY orderdate DESC`;
    try {
      let result = await db(sqlGetOrders);
      if (result.data.length === 0) {
        res.status(404).send({ error: "This user has no orders!" });
      } else {
        let userOrders = result.data;
        for (let i in userOrders) {
            let orderid = userOrders[i].orderid;
            let orderItems = await db(`SELECT orderitems.*, products.name from orderitems JOIN products ON products.productid = orderitems.productid WHERE orderid = ${orderid}`);
            userOrders[i].orderItems = orderItems.data;
        }
        res.send(userOrders);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Get order(s) by seller ID

router.get("/seller/:sellerid", async (req, res) => {
  let sellerid = req.params.sellerid;
  console.log('The seller id is ' + sellerid);
  let sqlGetOrders = `select * from orders ORDER BY orderdate DESC`;
  try {
    let result = await db(sqlGetOrders);
    if (result.data.length === 0) {
      res.status(404).send({ error: "No orders found!" });
    } else {
      let sellerOrders = result.data;
      for (let i in sellerOrders) {
          let orderid = sellerOrders[i].orderid;
          let orderItems = await db(`SELECT orderitems.*, products.name, products.listedby from orderitems JOIN products ON products.productid = orderitems.productid WHERE orderid = ${orderid} AND listedby = ${sellerid}`);
          sellerOrders[i].orderItems = orderItems.data;
      }
      res.send(sellerOrders);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Add new order

router.post("/create", async (req, res) => {
    let { userid } = req.body;
      try {
        
        // Create a new order
        let sqlCreateOrder = `insert into orders (userid) values (${userid})`;
        await db(sqlCreateOrder);
        
        // Get the orderid of the order you just created
        let result = await db(`SELECT * from orders ORDER BY orderid DESC`);
        let orderid = result.data[0].orderid;
        
        // Associate that id with the items in the cart so you can identify them
        let sqlUpdateCart = `UPDATE cart SET orderid = ${orderid} WHERE userid = ${userid}`;
        await db(sqlUpdateCart);
        
        // Copy the items from the cart into new order items
        let sqlCreateOrderItems = `insert into OrderItems (orderid, orderprice, orderquantity, productid, subtotal) select orderid, price, quantity, productid, subtotal from cart where userid = ${userid}`
        await db(sqlCreateOrderItems);
        
        // Calculate the order total
        let sqlGetOrderItems = `select * from orderitems WHERE orderid = ${orderid}`
        let orderItems = await db(sqlGetOrderItems);
        let orderTotal = 0;
        for (let i in orderItems.data) {
          orderTotal+= orderItems.data[i].subtotal
        }
        await db(`UPDATE orders SET ordertotal = ${orderTotal} WHERE orderid = ${orderid}`)
        
        // Empty the cart
        let sqlEmptyCart = `DELETE FROM cart WHERE userid = ${userid}`;
        await db(sqlEmptyCart);
        
        // Return the final order
        let sqlGetOrder = `SELECT * from orders WHERE orderid = ${orderid}`;
        let orderResult = await db(sqlGetOrder);
        let order = orderResult.data;
        res.status(201).send(order);
    } 
    catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  
module.exports = router;