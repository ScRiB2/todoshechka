import {API} from "../../API/index";
import {AuthActionTypes, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, UserAuthData, UserData} from "./types";
import {AppThunk} from "../index";

export function auth(authData: UserAuthData): AppThunk {
    return async dispatch => {
        const response = await API.postLogin(authData);
        if (response) {
            if (response.status != 200)
                return dispatch(loginError(response.data.message))
            // localStorage.setItem("user", response.data.username)
            dispatch(loginSuccess(response.data))
        } else {
            dispatch(loginError('Network Error'))
        }
    }
}

export function loginSuccess(user: UserData): AuthActionTypes {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

export function loginError(error: string): AuthActionTypes {
    return {
        type: LOGIN_ERROR,
        error
    }
}

export function logout(): AuthActionTypes {
    return {
        type: LOGOUT
    }
}
