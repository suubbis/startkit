import {
    GET_SESSION,
    SET_SESSION,
    SET_USER_DATA,
} from "@/actions/types.js";

const initialState = {
    user: {},
    userRole: "",
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SESSION:
            return state;

        case SET_SESSION:
            return {
                ...state,
                ...action.payload,
            };

        case SET_USER_DATA:
            return {
                ...state,
                user: action.payload.user,
            };
        default:
            return state;
    }
}
