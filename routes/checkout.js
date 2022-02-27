// const express = require('express');
// const router = express.Router();

// const CartServices = require('../services/cartServices');
// const Stripe = require('stripe')(
    // process.env.STRIPE_SEC_KEY)
/**
 * when nodemon running you must re run the nodemon to register new changes
 * credit card must not reqach express server bcos small team we cannot afford security of user
 * set credit card to stripe
 * 
 * ON CHECKOUT PAYMENT
 * inform stripe user wants to chechout,
 * stripe will provide session ID / stripe payment session
 * redirect user to stripe we also include the session ID
 * session ID payment === receipt
 * webiste ask receipt , then to stripe, stripe process
 * then stripe inform us if it is paid or not
*/

/**
 * router.get('/', async function(req, res) {
    // Step 1. create line items
    // each line item === one item user has to pay
    // in
})
module.exports = router;

 */
