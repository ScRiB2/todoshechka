import {API} from "../../API/index";
import {AuthActionTypes, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, UserAuthData, UserData} from "./types";
import {AppThunk} from "../index";

export function login(authData: UserAuthData): AppThunk {
    return async dispatch => {
        const response = await API.postLogin(authData);
        if (response) {
            if (response.status != 200)
                return dispatch(loginError(response.data.message));
            dispatch(loginSuccess(response.data))
        } else {
            dispatch(loginError('Network Error'))
        }
    }
}

export function auth(): AppThunk {
    return async dispatch => {
        const response = await API.getMe();
        if (response && response.status == 200) {
            dispatch(loginSuccess(response.data));
        }
    }
}

export function logout() {
    return dispatch => {
        API.postLogout()
            .then(() => dispatch({
                type: LOGOUT
            }))
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
