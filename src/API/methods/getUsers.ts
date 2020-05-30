// @ts-ignore
import axios from "axios";
import {apiBaseUrl} from "../../env/env";

export const getUsers = () => {
    const req = axios.create({
        withCredentials: true
    });

    return req.get(apiBaseUrl + '/users')
        .then(response => response)
        .catch(error => error.response);
};