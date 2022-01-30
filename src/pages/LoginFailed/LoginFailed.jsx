import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import heartLogo from "../../assets/images/heart-logo.png";
import heartEyesLogo from "../../assets/images/heart-eyes-logo.png";
import sadBoosterLogo from "../../assets/images/sad-logo.png";

import "./LoginFailed.scss";

const LoginFailed = () => {
    return (
        <>
            <Navbar />

            <div className="login-failed">
                <h3 className="login-failed-title">
                    <img src={sadBoosterLogo} alt="sad booster logo" />
                    Premium not found!
                </h3>
                <p className="login-failed-description">
                    Booster Bot dashboard is currently only available to{" "}
                    <b>premium users.</b>
                </p>

                <div className="login-failed-containers">
                    <div className="login-failed-container">
                        <img
                            className="login-failed-container-image login-failed-container-image-premium"
                            src={heartLogo}
                            alt="heart eyes booster logo"
                        />
                        <p className="login-failed-container-description">
                            Join <b>premium</b> to support the bot developement
                            and get extra benifits like early access to new
                            features + many more features mentioned in{" "}
                            <b>bb premium</b> command.
                        </p>
                        <button className="login-failed-container-button login-failed-container-button-premium">
                            <a
                                href="https://boosterbot.xyz/premium"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Become a premium user
                            </a>
                        </button>
                    </div>
                    <div className="login-failed-container">
                        <img
                            className="login-failed-container-image login-failed-container-image-support"
                            src={heartEyesLogo}
                            alt="heart eyes booster logo"
                        />
                        <p className="login-failed-container-description">
                            Join <b>Support Server</b> for more information.
                            <br />
                            Top voters on support servers get free premium +
                            sneek peak to upcoming features and ongoing
                            developement process.
                        </p>
                        <button className="login-failed-container-button login-failed-container-button-support">
                            <a
                                href="https://boosterbot.xyz/support"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Join Support Server
                            </a>
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default LoginFailed;
