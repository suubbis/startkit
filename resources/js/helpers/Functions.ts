import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HashIds from "hashids";

const hashIds = new HashIds("", 10);

export const isAndroid = () =>
    isDeviceIndex(navigator.userAgent.match(/Android/i));
export const isBlackBerry = () =>
    isDeviceIndex(navigator.userAgent.match(/BlackBerry/i));
export const isiOS = () =>
    isDeviceIndex(navigator.userAgent.match(/iPhone|iPad|iPod/i));

export const isWindows = () => navigator.platform.indexOf("Win") > -1;
export const isMac = () => navigator.platform.indexOf("Mac") > -1;
export const isLinux = () => navigator.platform.indexOf("Linux") > -1;

export const isDeviceIndex = (device) => (device ? device.index > -1 : false);

export const isMobile = () => isAndroid() || isBlackBerry() || isiOS();
export const isDesktop = () => isWindows() || isMac() || isLinux();

export const encodeId = (id) => hashIds.encode(id);
export const decodeID = (id) => {
    const decodedID = hashIds.decode(id);
    return decodedID.length ? decodedID[0] : decodedID;
};

export const isAuthenticated = () => !!Cookies.get("_startkit"); // return true false

export const setSession = (data) => {
    const __session = {
        __token: data.token,
    };
    Cookies.set("_startkit", JSON.stringify(__session), { expires: 30 });
};
export const destroySession = () =>
    isAuthenticated() ? Cookies.remove("_startkit") : false;

export const getSession = () =>
    isAuthenticated() ? JSON.parse(Cookies.get("_startkit")) : false;

export const authHeaders = () => {
    if (isAuthenticated()) {
        return {
            headers: {
                Authorization: "Bearer " + getSession().__token,
                Accept: "application/json",
            },
        };
    }
};

export const getToken = () => isAuthenticated() ? "Bearer " + getSession().__token : null;

export const toastAlert = (type, message) => {
    if (type === "success") {
        return toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } else if (type === "error") {
        return toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}