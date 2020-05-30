// @ts-ignore
import axios from "axios";
import {apiBaseUrl} from "../../../env/env";
import {TodoReqData} from "../../../store/auth/types";

export const putTodo = (id: number, data: TodoReqData) => {
    const req = axios.create({
        withCredentials: true
    });

    return req.put(apiBaseUrl + '/todos/' + id, data)
        .then(response => response)
        .catch(error => error.response);
};