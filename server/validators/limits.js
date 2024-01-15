require("dotenv").config();
const axios = require("axios");

let limits = {};

const fetchLimits = async () => {
    axios({
        method: "get",
        url: `${process.env.BOT_SERVER_URL}/init-configs`,
        headers: {
            Authorization: `Bot ${process.env.BOT_TOKEN}`,
        },
    })
        .then((res) => {
            limits = res.data;
            console.log("Limits updated:", limits);
        })
        .catch((err) => console.error(`Error in fetching limits: ${err}`));
};

// Schedule periodic updates
setInterval(fetchLimits, 60 * 60 * 1000);
fetchLimits();

const getLimits = () => {
    return limits;
};

module.exports = {
    getLimits,
};
