var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config');
const db = require("../model/helper");


// Register a seller with POST .

router.post('/seller/register', async (req, res) => {
    let {username, password, email} = req.body;
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    try {
        let sql = `
        INSERT INTO sellers (username, password, email)
        VALUES ('${username}', '${hashedPassword}', '${email}')
        `;
        await db(sql);
        console.log(hashedPassword)
        res.send({message: 'Registration successful'});
    } catch (err) {
        res.status(500).send({error: err.message});
    }
});

// Login a seller with POST

router.post('/seller/login', async (req, res) => {
    let {username, password} = req.body;

    try {
        let results = await db(`SELECT * FROM sellers WHERE username = '${username}'`)
        if (results.data.length === 0) {
            res.status(401).send({error: 'Login failed'});
        } else {
            let seller = results.data[0];
            let passwordsEqual = await bcrypt.compare(password, seller.password);
            if (passwordsEqual) {
                let payload = {sellerid: seller.sellerid};
                let token = jwt.sign(payload, SECRET_KEY);
                delete seller.password;
                res.send({
                    message: 'Login successful',
                    token: token,
                    seller: seller
                });
            } else {
                res.status(401).send({error: 'Login failed'});
            }
        }
    } catch (err) {
        res.status(500).send({error: err.message});
    }
}); 

module.exports = router;