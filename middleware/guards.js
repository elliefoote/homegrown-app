const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config");

// Ensure user is logged in

function ensureUserLoggedIn(req, res, next) {
    let token = _getToken(req);

    try {
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (err) {
        res.status(401).send({error: 'Unauthorized'});
    }
}

function ensureSellerLoggedIn(req, res, next) {
    let token = _getToken(req);

    try {
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (err) {
        res.status(401).send({error: 'Unauthorized'});
    }
}

// Ensure user is logged in and accessing their own page
// ie userId in token === userId in params

function ensureSameUser(req, res, next) {
    let token = _getToken(req);
    try {
        let payload = jwt.verify(token, SECRET_KEY);
        if (payload.userid === Number(req.params.userid)) {
            next();
        } else {
            res.status(401).send({error: 'Unauthorized'}); 
        }
    } catch (err) {
        res.status(500).send({error: err.message});
    }
}

function ensureSameSeller(req, res, next) {
    let token = _getToken(req);

    try {
        let payload = jwt.verify(token, SECRET_KEY);
        console.log("token where r u", payload);
        if (payload.sellerid === Number(req.params.sellerid)) {
            next();
        } else {
            res.status(401).send({error: 'Unauthorized'});
        }
    } catch (err) {
        res.status(500).send({error: err.message});
    }
}

/**
 * Return the JWT token if found, else return ''
 * Authorization header string looks like: "Bearer <token>"
 **/

 function _getToken(req) {
    // Return '' if header not found
    if ( !('authorization' in req.headers) ) {
        return '';
    }

    // Split header into 'Bearer' and token
    let authHeader = req.headers['authorization'];
    let [str, token] = authHeader.split(' ');

    return (str === 'Bearer') ? token : '';
}

module.exports = {
    ensureUserLoggedIn,
    ensureSellerLoggedIn,
    ensureSameUser,
    ensureSameSeller 
}