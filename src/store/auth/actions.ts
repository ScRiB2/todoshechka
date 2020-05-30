import {API} from "../../API/index";
import {AuthActionTypes, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, UserAuthData, UserData} from "./types";
import {AppThunk} from "../index";

export function login(authData: UserAuthData): AppThunk {
    return async dispatch => {
        const response = await API.postLogin(authData);
        if (response) {
            if (response.status == 200)
                dispatch(loginSuccess(response.data));
            else if (response.status == 400)
                dispatch(loginError(response.data.message));
            else dispatch(loginError(response.statusText))

        } else {
            dispatch(loginError(response.statusText))
        }
    }
}

export function auth(): AppThunk {
    return async dispatch => {
        const res = await API.getMe();
        if (res && res.status == 200) {
            dispatch(loginSuccess(res.data));
        } else if (res.status == 500) return res.statusText
    }
}

export function logout() {
    return async dispatch => {
        const res = await API.postLogout();
        if (res && res.status == 200) {
            dispatch({
                type: LOGOUT
            });
        } else if (res.status == 500) return res.statusText
    }
}

function loginSuccess(user: UserData): AuthActionTypes {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

function loginError(error: string): AuthActionTypes {
    return {
        type: LOGIN_ERROR,
        error
    }
}
