import {apiBaseUrl} from "../../env/env";
import axios from 'axios';
import {UserAuthData} from "../../store/auth/types";

export const postLogin = (data: UserAuthData) => {
    const userReq = axios.create({
        withCredentials: true
    });

    return userReq.post(apiBaseUrl + '/login', data)
        .then(response => response)
        .catch(error => error.response);
};