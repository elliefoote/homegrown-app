var express = require('express');
var router = express.Router();
const {ensureSameSeller} = require('../middleware/guards');
const {makePatchSQL} = require('../middleware/helper');
const db = require("../model/helper");
const fs = require('fs/promises');
var path = require('path');
const mime = require("mime-types");

/* GET sellers listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET one seller
router.get('/:sellerid', async function(req, res, next) {
  let {sellerid} = req.params;
  let sqlSeller = `select * from sellers WHERE sellerid = ${sellerid}`;
  let sqlProds = `select * from products WHERE listedby = ${sellerid}`;
  try {
    let sellerResults = await db(sqlSeller);
    let prodResults = await db(sqlProds);
    let seller = sellerResults.data[0];
    let prods = prodResults.data;
    delete seller.password;
    seller.products = prods;
    res.send(seller);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
}); 

// Update Seller Shop Info with PATCH 
router.patch('/:sellerid', ensureSameSeller, async (req, res) => {
  let { sellerid } = req.params;
  let sql = makePatchSQL(req.body, sellerid);
  try {
      let result = await db(sql);
      // ...
        let seller = result.data[0];
        res.send(seller);
        
  } catch (err) {
    res.status(500).send({error: err.messsage})
  }
});

/* Patch profile image

- Create a folder in public called images/sellers.
- Store just the filename in the DB and store the image in the folder above
- In the GET /sellers/:id route, after fetching the record from the DB, prepend the filename in profilepic with something like http://localhost:5000/images/sellers/ so it’s a proper URL that the client can use*/

router.patch('/profile/:sellerid', async function (req, res) { //removed ensureSameSeller as got jwt error
  let { sellerid } = req.params;
  console.log("req.files:", req.files)
  if(!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send({error: 'No file'})
    return;
  }
  let { myfile } = req.files;
  let fromPath = myfile.tempFilePath;
  let toPath = path.join(__dirname, '../public/images/sellers/') + myfile.name;
  try {
    await fs.rename(fromPath, toPath);
    let sql = `
    UPDATE sellers SET picurl = '${myfile.name}'
    WHERE sellerid = ${sellerid}
    `;
    await db(sql)
    res.status(201).send('Profile photo successfully updated!');
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})

router.patch('/cover/:sellerid', async function (req, res) { //removed ensureSameSeller as got jwt error
  let { sellerid } = req.params;
  console.log("req.files:", req.files)
  if(!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send({error: 'No file'})
    return;
  }
  let { myfile } = req.files;
  let fromPath = myfile.tempFilePath;
  let toPath = path.join(__dirname, '../public/images/sellers/') + myfile.name;
  try {
    await fs.rename(fromPath, toPath);
    let sql = `
    UPDATE sellers SET coverurl = '${myfile.name}'
    WHERE sellerid = ${sellerid}
    `;
    await db(sql)
    res.status(201).send('Cover photo successfully updated!');
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})

// let result = await db(sql);
//     let seller = result.data[0];
//     res.status(201).send(seller);




// GET all products where listedby = sellerid

// router.get("/", function(req, res, next) {
//   // console.log(req.query);
//   let { productid } = req.query;
//   if (productid) {
//     db(`SELECT * FROM products 
//     WHERE listedby = '${sellerid}';`)
//     .then(results => {
//       console.log(results);
//       res.send(results.data);
//     })
//     .catch(err => res.status(500).send(err));
//   } else {
//     db("SELECT * FROM products;")
//     .then(results => {
//       res.send(results.data);
//     })
//     .catch(err => res.status(500).send(err));
//   }
// });

module.exports = router;