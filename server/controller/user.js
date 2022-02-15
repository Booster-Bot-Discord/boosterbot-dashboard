const User = require("../database/models/User");

const getAllGuilds = async (req, res) => {
    try {
        const userDate = await User.findOne({ discordId: req.user.discordId });
        const guilds = await userDate.guilds;
        res.status(200).json({ guilds });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
}


module.exports = {
    getAllGuilds
};