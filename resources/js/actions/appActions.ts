import {
    GET_SESSION,
    SET_SESSION,
    SET_USER_DATA,
} from "./types";
import Axios from "../config/Axios";
import {
    authHeaders,
    destroySession,
    isAuthenticated,
    toastAlert,
} from "@/helpers/Functions";
import History from "../utils/history";


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
                if (response.data.code) {
                    const data = response.data.data;
                    dispatch({
                        type: SET_SESSION,
                        payload: data,
                    });
                }
            })
            .catch((error) => {
                if (error?.response?.status === 401 && !destroySession()) {
                    window.location.href = "/login";
                }
            });
    }
};
export const postRoute = (url: string, payload: any, toast = false) => (dispatch) => {
    return Axios.post(`${url}`, payload, authHeaders())
        .then((response) => {
            console.log(response, "save data");
            if (response.status) {
                if (response.data.message && toast) toastAlert("success", response.data.message);
            } else {
                if (response.data.message && toast)
                    toastAlert("error", response.data.message);
            }
            return response.data;
        })
        .catch((error) => {
            if (error.response.status == 401) {
                destroySession();
                window.location.href = "/login";
            }
            toastAlert("error", error.response.data.message);

            return error?.response?.data;
        });
};

export const patchRoute = (url: string, payload: any, toast = false) => (dispatch) => {
    return Axios.put(`${url}`, payload, authHeaders())
        .then((res) => {
            console.log(res, "update data");
            if (res.status) {
                if (res.data.message && toast) toastAlert("success", res.data.message);
            } else {
                if (res.data.message && toast) toastAlert("error", res.data.message );
            }
            return res.data;
        })
        .catch((error) => {
            if (error.response.status == 401) {
                destroySession();
                window.location.href = "/login";
            }
            console.log(error.response, "update data error");
            toastAlert("error", error.response?.data.message);
            return error.response?.data;
        });
};

export const getRoute = (url: string, toast = false) => (dispatch) => {
    return Axios.get(`${url}`, authHeaders())
        .then((response) => {
            console.log(response, "listing data response");
            if (response.data.status) {
                if (response.data.message && toast)
                    toastAlert("success", response.data.message);
            } else {
                console.log("res: ", response.data.message);
                toastAlert("error", response.data.message);
            }
            return response.data;
        })
        .catch((error) => {
            console.log(error.response, "listing data error");
            if (error.response.status == 401) {
                destroySession();
                window.location.href = "/login";
            }
            toastAlert("error", error.response?.data.message);
            return error.response?.data;
        });
};

export const getMethod = (url: string, params: any, toast = false) => (dispatch) => {
    return Axios.get(url, {params: {...params}, ...authHeaders()})
        .then((response) => {
            console.log(response, "get method response");
            if (response.data.status) {
                if (response.data.message && toast)
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

export const deleteRoute = (url: string, toast = false) => (dispatch) => {
    return Axios.delete(`${url}`, authHeaders())
        .then((response) => {
            console.log(response, "deleted response");
            if (response.data) {
                if (response.data.message && toast)
                    toastAlert("success", response.data.message);
            } else {
                if (response.data.message && toast)
                    toastAlert("error", response.data.message);
            }
            return response.data;
        })
        .catch((error) => {
            if (error.response.status == 401) {
                destroySession();
                window.location.href = "/login";
            }
            toastAlert("error", error.response);
            return error.response?.data;
        });
};

export const setUserData = (payload) => (dispatch) => {
    dispatch({
        type: SET_USER_DATA,
        payload,
    });
};


