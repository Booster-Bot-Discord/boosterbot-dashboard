const mongoose = require('mongoose');

const User = new mongoose.Schema({
    discordId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    discriminator: { type: String, required: true },
    permissionLevel: { type: Number, default: 1 },
    avatar: { type: String, default: null },
    email: { type: String },
    verified: { type: Boolean, default: false },
    guilds: [{ type: Object, default: null }],
    amountspentInPremium: { type: Number, default: 0 },
    premiumRemaining: { type: Number, default: 0 },
    premiumGuilds: [{ type: Object, default: null }]
},
    { timestamps: true }
);

User.index({ discordId: 1 });

module.exports = mongoose.model('User', User);