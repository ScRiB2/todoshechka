// @ts-ignore
import axios from 'axios';
import {TodoReqData} from "../../../store/auth/types";
import {apiBaseUrl} from "../../../env/env";

export const postTodo = (data: TodoReqData) => {
    const req = axios.create({
        withCredentials: true
    });

    return req.post(apiBaseUrl + '/todos', data)
        .then(response => response)
        .catch(error => error.response);
};