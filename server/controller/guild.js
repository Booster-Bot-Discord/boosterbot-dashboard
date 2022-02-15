require("dotenv").config();
const axios = require("axios");
const GuildConfig = require("../database/models/GuildConfig");
const GreetConfig = require("../database/models/GreetConfig");
const GuildData = require("../database/models/GuildData");

const { validateGuildConfig, validateGreetConfig } = require("../validators/guild");

// get guild config from database.
const getGuildConfig = async (req, res) => {
    try {
        const dbGeneraConfig = await GuildConfig.findOne({ id: req.params.guildId });
        const dbGreetConfig = await GreetConfig.findOne({ id: req.params.guildId });
        const dbBoostersData = await GuildData.findOne({ id: req.params.guildId });
        return res.status(200).json({ dbGeneraConfig, dbGreetConfig, dbBoostersData });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

// update guild config in database
const updateGuildConfig = async (req, res) => {
    try {
        const config = await validateGuildConfig(req.body.id, req.body);
        await axios({
            method: "delete",
            url: `${process.env.BOT_SERVER_URL}/guild/${req.params.guildId}/cache/guild-config`,
            headers: {
                "Authorization": `Bot ${process.env.BOT_TOKEN}`
            }
        });
        await GuildConfig.findOneAndUpdate({ id: req.params.guildId }, config);
        return res.status(200).json({ message: "Guild config updated" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Could not update settings" });
    }
}

// update greet config in database
const updateGreetConfig = async (req, res) => {
    try {
        // TODO: GREET CONFIG CACHING AND ADD AUTH HEADER
        // await axios.default.delete(`${process.env.BOT_SERVER_URL}/guild/${req.params.guildId}/cache`);
        const config = await validateGreetConfig(req.body.id, req.body);
        await GreetConfig.findOneAndUpdate({ id: req.params.guildId }, config);
        return res.status(200).json({ message: "Greet config updated" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Could not update settings" });
    }
}

// update guild syatem channel in discord api
const updateGuildSystemChannel = async (req, res) => {
    try {
        await axios({
            method: "delete",
            url: `${process.env.BOT_SERVER_URL}/systemchannel/${req.params.guildId}`,
            headers: {
                "Authorization": `Bot ${process.env.BOT_TOKEN}`
            },
            data: {
                channelId: req.body.channelId
            }
        });
        return res.status(200).json({ message: "Guild system channel updated." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Could not update system channel." });
    }
}

// update guild system channal flags in discord api
const updateGuildSystemChannelFlags = async (req, res) => {
    try {
        await axios({
            method: "patch",
            url: `${process.env.BOT_SERVER_URL}/systemchannelflags/${req.params.guildId}`,
            headers: {
                "Authorization": `Bot ${process.env.BOT_TOKEN}`
            },
            data: {
                systemChannelFlags: req.body.flags
            }
        });
        return res.status(200).json({ message: "Guild system channel flags updated." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Could not update system channel flags." });
    }
}

// get guild from bot api
const getGuildData = async (req, res) => {
    try {
        const result = await axios({
            method: "get",
            url: `${process.env.BOT_SERVER_URL}/guilds/${req.params.guildId}`,
            headers: {
                "Authorization": `Bot ${process.env.BOT_TOKEN}`
            }
        });
        return res.status(200).json(result.data);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getGuildConfig,
    updateGuildConfig,
    updateGreetConfig,
    updateGuildSystemChannel,
    updateGuildSystemChannelFlags,
    getGuildData
};