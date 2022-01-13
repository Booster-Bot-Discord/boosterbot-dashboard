import React from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import AddonMessage from "./AddonMessage/AddonMessage";
import Messages from "./Messages/Messages";
import Images from "./Images/Images";
import Channel from "./Channel/Channel";
import IsDM from "./IsDM/IsDM";
import IsEmbed from "./IsEmbed/IsEmbed";
import ShowStats from "./ShowStats/ShowStats";
import Embed from "./Embed/Embed";

import "./Greet.scss";

const Greet = ({ setActiveTab }) => {
    const history = useHistory();
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);
    const systemChannelId = useSelector((state) => state.guild.systemChannelId);
    const guildFlags = useSelector((state) => state.guild.systemChannelFlags);

    const [disableButton, setDisableButton] = React.useState(false);
    const [greetDisabled, setGreetDisabled] = React.useState(true);
    const handleActiveStateChange = () => {
        setActiveTab("general");
        history.push(
            `/dashboard/${history.location.pathname.split("/")[2]}/general`
        );
    };
    const [isEmbed, setIsEmbed] = React.useState(greetConfig?.isEmbed || false);

    // sync greet config
    React.useEffect(() => {
        setIsEmbed(greetConfig?.isEmbed || false);
    }, [greetConfig]);

    // sync greet disable states
    React.useEffect(() => {
        setGreetDisabled(
            guildFlags?.includes("SUPPRESS_PREMIUM_SUBSCRIPTIONS") ||
                !systemChannelId
        );
    }, [systemChannelId, guildFlags]);

    return (
        <>
            <h1 className="greet-heading">Booster Greeting Message</h1>

            <div className="greet">
                {/* ENABLE || DISABLE greet messages */}
                {greetDisabled && (
                    <div className="greet-std-container">
                        <p className="greet-title">System Boost Message:</p>
                        <div className="greet-content">
                            <p>
                                System Boost Messages are <b>"Disabled"</b>{" "}
                                <br /> These are required for proper functioning
                                of Booster Bot. <br />
                            </p>
                            <button
                                className="greet-enable-button"
                                onClick={handleActiveStateChange}
                            >
                                Enable from here!
                            </button>
                        </div>
                    </div>
                )}

                {/* GREET CHANNEL SETTINGS */}
                <Channel
                    disableButton={disableButton}
                    setDisableButton={setDisableButton}
                />

                {/* IS GREET DM */}
                <IsDM
                    disableButton={disableButton}
                    setDisableButton={setDisableButton}
                />

                {/* IS GREET MESSAGE AN EMBED */}
                <IsEmbed
                    disableButton={disableButton}
                    setDisableButton={setDisableButton}
                />

                {/* IF STATS ARE SHOWS WITH MESSAGE */}
                <ShowStats
                    disableButton={disableButton}
                    setDisableButton={setDisableButton}
                />

                {/* GREET MESSAGE SETTINGS */}
                <Messages
                    disableButton={disableButton}
                    setDisableButton={setDisableButton}
                />
                {/* GREET ADDON MESSAGE SETTINGS */}
                <AddonMessage
                    disableButton={disableButton}
                    setDisableButton={setDisableButton}
                />

                {/* GREET IMAGE SETTINGS */}
                <Images
                    disableButton={disableButton}
                    setDisableButton={setDisableButton}
                />

                {/* GREET EMBED SETTINGS */}
                {isEmbed && (
                    <Embed
                        disableButton={disableButton}
                        setDisableButton={setDisableButton}
                    />
                )}
            </div>
        </>
    );
};

export default Greet;
