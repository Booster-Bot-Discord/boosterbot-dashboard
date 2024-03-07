const express = require("express");
const passport = require("passport");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { logout, checkAuthenticated } = require("../controller/auth");
const { getDiscordStrategy } = require("../strategies/discord");

const router = express.Router();

router.get(
    "/discord",
    (req, res, next) => {
        const referer = req.headers.referer ?? process.env.SERVER_URL + "/";
        req.session.returnTo = referer;
        const callbackURL = `${referer}api/v1/auth/discord/callback`;
        passport.use(getDiscordStrategy(callbackURL));
        next();
    },
    passport.authenticate("discord", { prompt: "none", keepSessionInfo: true })
);
router.get(
    "/discord/callback",
    passport.authenticate("discord", {
        successReturnToOrRedirect: process.env.SERVER_URL + "/",
        failureRedirect: process.env.SERVER_URL + "/auth-failed",
    })
);
router.get("/logout", isLoggedIn, logout);
router.get("/check", checkAuthenticated);

module.exports = router;
