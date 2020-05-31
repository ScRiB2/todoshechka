import {apiBaseUrl} from "../../env/env";
import axios from 'axios';

export const postLogout = () => {
    const req = axios.create({
        withCredentials: true
    });

    return req.post(apiBaseUrl + '/logout')
        .then(response => response)
        .catch(error => error.response);
};