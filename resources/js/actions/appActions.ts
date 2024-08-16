import {
    GET_SESSION,
    SET_SESSION,
    SET_USER_DATA,
} from "./types";
import Axios from "../Config/Axios";
import {
    authHeaders,
    destroySession,
    isAuthenticated,
    toastAlert,
} from "../Helpers/Functions";
import History from "../Utils/history";

export const getUserInfo = () => (dispatch) => {
    dispatch({
        type: GET_SESSION,
    });
};

export const setUserSession = (payload) => (dispatch) => {
    dispatch({
        type: SET_SESSION,
        payload: payload ? payload : {},
    });
};

export const getUserData = () => (dispatch) => {
    if (isAuthenticated()) {
        Axios.get("user_info", authHeaders())
            .then((response) => {
                console.log(response, "response");
                if (response.data.code === 200) {
                    const data = response.data.data;
                    dispatch({
                        type: SET_SESSION,
                        payload: data,
                    });
                }
            })
            .catch((error) => {
                if (error?.response?.status === 401 && !destroySession()) {
                    History.push("/login");
                }
            });
    }
};
export const postRoute = (url: string, payload: any) => (dispatch) => {
    return Axios.post(`${url}`, payload, authHeaders())
        .then((response) => {
            console.log(response, "save data");
            if (response.data.code === 200) {
                toastAlert("success", response.data.message);
            } else {
                if (response.data.message)
                    toastAlert("error", response.data.message);
            }
            return response.data;
        })
        .catch((error) => {
            toastAlert("error", error.response.data.message);

            return error?.response;
        });
};

export const patchRoute = (url: string, payload: any) => (dispatch) => {
    return Axios.put(`${url}`, payload, authHeaders())
        .then((res) => {
            console.log(res, "update data");
            if (res.data.code === 200) {
                if (res.data.message) toastAlert("success", res.data.message);
            } else {
                if (res.data.message) toastAlert("error", res.data.message );
            }
            return res.data;
        })
        .catch((error) => {
            toastAlert("error", error.response);
            return error.response;
        });
};

export const getRoute = (url: string) => (dispatch) => {
    return Axios.get(`${url}`, authHeaders())
        .then((response) => {
            console.log(response, "listing data response");
            if (response.data.code === 200) {
                toastAlert("success", response.data.message);
            } else {
                console.log("res: ", response.data.message);
                toastAlert("error", response.data.message);
            }
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};

export const getMethod = (url: string, params: any) => (dispatch) => {
    return Axios.get(url, {params: {...params}, ...authHeaders()})
        .then((response) => {
            console.log(response, "get method response");
            if (response.data.code === 200) {
                if (response.data.message)
                    toastAlert("success", response.data.message);
            } else toastAlert("error", response.data.message);

            return response.data;
        })
        .catch((error) => {
            if (error.response && error.response.message)
                toastAlert("error", error.response.message);

            console.log(error.response, "exception");
        });
};

export const deleteRoute = (url: string) => (dispatch) => {
    return Axios.delete(`${url}`, authHeaders())
        .then((response) => {
            console.log(response, "deleted response");
            if (response.data.code === 200) {
                if (response.data.message)
                    toastAlert("success", response.data.message);
            } else {
                if (response.data.message)
                    toastAlert("error", response.data.message);
            }
            return response.data;
        })
        .catch((error) => {
            toastAlert("error", error.response);
            return error.response;
        });
};

export const setUserData = (payload) => (dispatch) => {
    dispatch({
        type: SET_USER_DATA,
        payload,
    });
};


