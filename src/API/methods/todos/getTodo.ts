// @ts-ignore
import axios from "axios";
import {apiBaseUrl} from "../../../env/env";

export const getTodo = (id: number) => {
    const req = axios.create({
        withCredentials: true
    });

    return req.get(apiBaseUrl + '/todos/' + id)
        .then(response => response)
        .catch(error => error.response);
};