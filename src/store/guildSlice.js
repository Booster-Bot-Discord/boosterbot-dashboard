import { createSlice } from '@reduxjs/toolkit';

const guildSlice = createSlice({
    name: "guild",
    initialState: {
        available: false,
        discordId: "",
        name: "",
        icon: "",
        memberCount: 0,
        botNickname: "",
        permissions: null,
        highestRolePosition: 0,
        roles: [],
        channels: [],
        systemChannelId: null,
        systemChannelFlags: [],
        dbGeneralConfig: null,
        dbGreetConfig: null,
        dbBoostersData: null
    },
    reducers: {
        setAvailable: (state, action) => {
            state.available = action.payload;
        },
        setDiscordId: (state, action) => {
            state.discordId = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setIcon: (state, action) => {
            state.icon = action.payload;
        },
        setMemberCount: (state, action) => {
            state.memberCount = action.payload;
        },
        setBotNickname: (state, action) => {
            state.botNickname = action.payload;
        },
        setPermissions: (state, action) => {
            state.permissions = action.payload;
        },
        setHighRolePosition: (state, action) => {
            state.highestRolePosition = action.payload;
        },
        setRoles: (state, action) => {
            state.roles = action.payload;
        },
        setChannels: (state, action) => {
            state.channels = action.payload;
        },
        setSystemChannelId: (state, action) => {
            state.systemChannelId = action.payload;
        },
        setSystemChannelFlags: (state, action) => {
            state.systemChannelFlags = action.payload;
        },
        setDbGeneralConfig: (state, action) => {
            state.dbGeneralConfig = action.payload;
        },
        setDbGreetConfig: (state, action) => {
            state.dbGreetConfig = action.payload;
        },
        setDbBoostersData: (state, action) => {
            state.dbBoostersData = action.payload;
        }
    }
});

export const {
    setAvailable,
    setDiscordId,
    setName,
    setIcon,
    setPermissions,
    setHighRolePosition,
    setRoles,
    setEmojis,
    setChannels,
    setSystemChannelId,
    setSystemChannelFlags,
    setDbGeneralConfig,
    setDbGreetConfig,
    setDbBoostersData,
    setMemberCount,
    setBotNickname
} = guildSlice.actions;

export default guildSlice.reducer;