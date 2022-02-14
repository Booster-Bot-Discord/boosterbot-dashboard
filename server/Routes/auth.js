const express = require('express');
const passport = require('passport');
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { logout, checkAuthenticated } = require("../controller/auth");

const router = express.Router();

router.get('/discord', passport.authenticate('discord', { prompt: 'none' }));
router.get('/discord/callback', passport.authenticate('discord', {
    successRedirect: process.env.SERVER_URL + '/',
    failureRedirect: process.env.SERVER_URL + '/auth-failed'
}));
router.get('/logout', isLoggedIn, logout);
router.get('/check', checkAuthenticated);

module.exports = router;