import {API} from "../../API/index";
import {AuthActionTypes, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, UserAuthData, UserData} from "./types";
import {AppThunk} from "../index";
import {APIErrorHandler, ResultStatusType} from "../../API/utils";

export function login(authData: UserAuthData): AppThunk {
    return async dispatch => {
        const res = await API.postLogin(authData);
        const result = APIErrorHandler(res);
        if (!result) return;
        if (result.status == ResultStatusType.SUCCESS) {
            dispatch(loginSuccess(result.data))
        } else return dispatch(loginError(result.message));
    }
}

export function auth(): AppThunk {
    return async dispatch => {
        const res = await API.getMe();
        const result = APIErrorHandler(res);
        if (!result) return;
        if (result.status == ResultStatusType.SUCCESS) {
            dispatch(loginSuccess(result.data));
        } else return result.message
    }
}

export function logout() {
    return async dispatch => {
        const res = await API.postLogout();
        const result = APIErrorHandler(res);
        if (!result) return;
        if (result.status == ResultStatusType.SUCCESS || result.message == 'Bad Request') {
            dispatch({
                type: LOGOUT
            });
        } else return result.message;
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
