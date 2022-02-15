require("dotenv").config();
const axios = require("axios");
const GuildConfig = require("../database/models/GuildConfig");
const GreetConfig = require("../database/models/GreetConfig");
const GuildData = require("../database/models/GuildData");

const { validateGuildConfig, validateGreetConfig } = require("../validators/guild");

// get guild config from database.
const getGuildConfig = async (req, res) => {
    const guildId = req.params.guildId;
    if (!guildId) return res.status(400).json({ message: "No guild id provided." });
    try {
        const dbGeneraConfig = await GuildConfig.findOne({ id: guildId });
        let dbGreetConfig = await GreetConfig.findOne({ id: guildId });
        if (!dbGreetConfig) {
            const greetConfig = new GreetConfig({
                id: guildId,
                messages: ["Thanks for the boost <a:boost:803182075666366494>\nEnjoy your special perks <a:love_shower:803182076001910784>"],
                channel: null,
                isEmbed: true,
                stats: true,
                thumbnail: "user",
                author: "{username}",
                authorIcon: "user",
                footer: "{username} Boosted the server :)",
                footerIcon: "https://cdn.discordapp.com/emojis/803182075666366494.gif",
            });
            await greetConfig.save().catch(console.error);
            dbGreetConfig = greetConfig;
        }
        const dbBoostersData = await GuildData.findOne({ id: guildId });
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
        const nickRes = await axios({
            method: "get",
            url: `${process.env.BOT_SERVER_URL}/nickname/${req.params.guildId}`,
            headers: {
                "Authorization": `Bot ${process.env.BOT_TOKEN}`
            }
        });
        const data = {
            ...result.data,
            ...nickRes.data
        };
        return res.status(200).json(data);
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