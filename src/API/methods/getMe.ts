import axios from "axios";
import {apiBaseUrl} from "../../env/env";

export const getMe = () => {
    const req = axios.create({
        withCredentials: true
    });

    return req.get(apiBaseUrl + '/me')
        .then(response => response)
        .catch(error => error.response);
};