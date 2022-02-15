require("dotenv").config();
const axios = require("axios");

const getStats = async (req, res) => {
    axios({
        method: "get",
        url: `${process.env.BOT_SERVER_URL}/stats`,
        headers: {
            "Authorization": `Bot ${process.env.BOT_TOKEN}`
        }
    })
        .then((result) => {
            res.status(200).json({
                message: "Data fetched successfully",
                stats: result.data
            })
        }).catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Internal Server Error"
            })
        });
}

module.exports = {
    getStats
};