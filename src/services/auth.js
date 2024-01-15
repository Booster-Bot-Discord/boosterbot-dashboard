import { authCheck, logout } from "../api";
import {
    authenticate,
    deauthenticate,
    setId,
    setDiscordId,
    setPermissionLevel,
    setUsername,
    setAvatar,
} from "../store/userSlice";
import { useDispatch } from "react-redux";

export const useDiscordLogin = () => {
    return function () {
        console.log(process.env);
        let loginURL = `${process.env.REACT_APP_PROD_SERVER_URL}/api/v1/auth/discord`;
        if (process.env.NODE_ENV === "development") {
            loginURL = `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/v1/auth/discord`;
        }
        window.open(loginURL, "_self");
    };
};

export const useAuthCheck = () => {
    const dispatch = useDispatch();

    return async function () {
        const res = await authCheck();
        if (res.status === 200) {
            dispatch(authenticate());
            dispatch(setId(res.data.id));
            dispatch(setDiscordId(res.data.discordId));
            dispatch(setUsername(res.data.username));
            dispatch(setAvatar(res.data.avatar));
            dispatch(setPermissionLevel(res.data.permissionLevel));
        } else {
            // do nothing
        }
    };
};

export const useLogout = () => {
    const dispatch = useDispatch();

    return function () {
        logout()
            .then((res) => {
                dispatch(deauthenticate());
                dispatch(setId(""));
                dispatch(setDiscordId(""));
                dispatch(setUsername(""));
                dispatch(setAvatar(""));
                dispatch(setPermissionLevel(1));
            })
            .catch((err) => {
                console.error(err.response);
            });
    };
};
