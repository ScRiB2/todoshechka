import {AuthActionTypes, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, UserState} from "./types";

const initState: UserState = {
    user: null,
    error: null
};

export default function authReducer(state = initState, action: AuthActionTypes): UserState {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {user: action.payload, error: null};
        case LOGIN_ERROR:
            return {...state, error: action.error};
        case LOGOUT:
            return {user: null, error: null};
        default:
            return state;
    }
}