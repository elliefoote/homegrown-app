var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config');
const db = require("../model/helper");
const {ensureUserLoggedIn} = require('../middleware/guards');


// Register a user with POST 

router.post('/user/register', async (req, res) => {
    let {username, password, email} = req.body;
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    try {
        let sql = `
        INSERT INTO users (username, password, email)
        VALUES ('${username}', '${hashedPassword}', '${email}')
        `;
        await db(sql);
        res.send({message: 'Registration successful'});
    } catch (err) {
        res.status(500).send({error: err.message});
    }
});

// Login a user with POST

router.post('/user/login', async (req, res) => {
    let {username, password} = req.body;

    try {
        let results = await db(`SELECT * FROM users WHERE username = '${username}'`)
        if (results.data.length === 0) {
            res.status(401).send({error: 'Login failed'});
        } else {
            let user = results.data[0];
            let passwordsEqual = await bcrypt.compare(password, user.password);
            if (passwordsEqual) {
                let payload = {userid: user.userid};
                let token = jwt.sign(payload, SECRET_KEY);
                delete user.password;
                res.send({
                    message: 'Login successful',
                    token: token,
                    user: user
                });
            } else {
                res.status(401).send({error: 'Login failed'});
            }
        }
    } catch (err) {
        res.status(500).send({error: err.message});
    }
});

router.patch('/user/change_password', ensureUserLoggedIn, async (req, res, next) => {
    let { username, oldPassword, newPassword } = req.body;
    let hashedNewPassword = await bcrypt.hash(newPassword, BCRYPT_WORK_FACTOR);
    let updatePassSQL = `
        UPDATE users
        SET password = '${hashedNewPassword}'
        WHERE username = '${username}'
      `;
    try {
        let results = await db(`SELECT * FROM users WHERE username = '${username}'`);
        if (results.data.length === 0) {
            // Username not found
            res.status(401).send({ error: 'User not found' });
        } else {
            let user = results.data[0];  // the user's row/record from the DB
            let passwordsEqual = await bcrypt.compare(oldPassword, user.password); // check that they correctly entered their old password
            if (passwordsEqual) {
                // Passwords match
                await db(updatePassSQL);
                let newResult = await db(`SELECT * FROM users WHERE username = '${username}'`);
                let updatedUser = newResult.data[0];
                let payload = { userid: updatedUser.userid,
                                usertype: updatedUser.usertype };
                // Create token containing user ID
                let token = jwt.sign(payload, SECRET_KEY);
                // Also return user (without password)
                delete updatedUser.password;
                res.send({
                    message: 'Password changed',
                    token: token,
                    user: updatedUser
                });
            } else {
                // Passwords don't match
                res.status(401).send({ error: 'Password change failed' });
            }
        }
    } catch (err) {
        next(err);
    }
});

// Update email

router.patch('/user/change_email', ensureUserLoggedIn, async (req, res, next) => {
    let { username, email } = req.body;
    let sqlUpdateEmail = `UPDATE users SET email = '${email}' WHERE username = '${username}'`;
    try {
        await db(sqlUpdateEmail);
        let newResult = await db(`SELECT * FROM users WHERE username = '${username}'`);
        let updatedUser = newResult.data[0];
        let payload = { userid: updatedUser.userid,
                        usertype: updatedUser.usertype };
        // Create token containing user ID
        let token = jwt.sign(payload, SECRET_KEY);
        // Also return user (without password)
        delete updatedUser.password;
        res.send({
            message: 'Email updated',
            token: token,
            user: updatedUser
            });
    } catch (err) {
        next(err);
    }
});

module.exports = router;