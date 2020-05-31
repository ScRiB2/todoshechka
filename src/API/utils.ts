import {LOGOUT} from "../store/auth/types";
import {getDispatch} from "../index";

export enum ResultStatusType {
    'SUCCESS', 'ERROR'
}

interface ResultOfApi {
    status: ResultStatusType
    data: any
    message: string
}


export function APIErrorHandler(res): ResultOfApi | null {
    const dispatch = getDispatch();
    const logout = () => dispatch({type: LOGOUT});
    if (res) {
        switch (res.status) {
            case 200:
            case 201:
            case 204:
                return {status: ResultStatusType.SUCCESS, data: res.data, message: null};
            case 401:
                logout();
                return null;
            case 400:
            default:
                return {
                    status: ResultStatusType.ERROR,
                    data: null,
                    message: res.data.message ? res.data.message : res.statusText
                }
        }

    } else return {status: ResultStatusType.ERROR, data: null, message: 'ERR_CONNECTION_REFUSED'}
}
