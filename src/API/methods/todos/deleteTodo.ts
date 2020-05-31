import axios from "axios";
import {apiBaseUrl} from "../../../env/env";

export const deleteTodo = (id: number) => {
    const req = axios.create({
        withCredentials: true
    });

    return req.delete(apiBaseUrl + '/todos/' + id)
        .then(response => response)
        .catch(error => error.response);
};