// @ts-ignore
import axios from "axios";
import {apiBaseUrl} from "../../../env/env";

export const getTodos = () => {
    const req = axios.create({
        withCredentials: true
    });

    return req.get(apiBaseUrl + '/todos')
        .then(response => response)
        .catch(error => error.response);
};