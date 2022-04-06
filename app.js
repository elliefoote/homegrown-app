var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');  // add at the top
const { STRIPE_SECRET_KEY } = require('./config');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const db = require('./model/helper');
const fileUpload = require('express-fileupload');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sellersRouter = require('./routes/sellers');
var productsRouter = require('./routes/products');
var authUsersRouter = require('./routes/authUsers');
var authSellersRouter = require('./routes/authSellers');
var cartRouter = require('./routes/cart');
var orderRouter = require('./routes/orders');
var orderItemsRouter = require ('./routes/orderitems');

var app = express();

app.use(cors());  // add after 'app' is created
app.use(logger('dev'));
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/client/build')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sellers', sellersRouter);
app.use('/products', productsRouter);
app.use('/', authUsersRouter);
app.use('/', authSellersRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/orderitems', orderItemsRouter);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
  })
);

const YOUR_DOMAIN = 'http://localhost:3000/cart';

app.post('/create-checkout-session', async (req, res) => {
  try {
    let {userid} = req.body;
    let cart = await db(`SELECT c.quantity, p.stripe_priceid AS price FROM cart AS c JOIN products AS p ON c.productid = p.productid WHERE userid = ${userid}`);
    let line_items = cart.data;
    console.log(line_items);
    if (line_items.length === 0) {
      res.status(404).send({ error: "Cart not found!" });
    } else {
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        metadata: {
          userid: userid
        },
        shipping_address_collection: {
          allowed_countries: ['ES'],
        },
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      });
      res.redirect(303, session.url);
    } 
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const endpointSecret = "whsec_3b0b7904fda0efe24bf2b2f2be128b23eac03e355fb741a2c700e0d76a27d632";

// Stripe requires the raw body to construct the event
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = await stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Successfully constructed event
  console.log('✅ Success:', event.id, event.type);

  // Create the order
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    let userid = session.metadata.userid;
    const orderemail = session.customer_details.email;
    const ordername = session.shipping.name;
    const { city, line1, postal_code } = session.shipping.address;
    const orderaddress = `${line1} ${city} ${postal_code}`
    try {
      // Create a new order
      let sqlCreateOrder = `insert into orders (userid, orderemail, ordername, orderaddress) values (${userid}, '${orderemail}', '${ordername}', '${orderaddress}')`;
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
  }
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// General error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({ error: err.message });
});

module.exports = app;