import {postLogin} from "./methods/postLogin";
import {postLogout} from "./methods/postLogout";
import {getMe} from "./methods/getMe";
import {getUsers} from "./methods/getUsers";
import {getTodos} from "./methods/todos/getTodos";
import {postTodo} from "./methods/todos/postTodo";
import {TodoReqData, UserAuthData} from "../store/auth/types";

export class  API {
    public static postLogin = (data: UserAuthData) => postLogin(data);
    public static postLogout = () => postLogout();
    public static getMe = () => getMe();
    public static getUsers = () => getUsers();
    public static getTodos = () => getTodos();
    public static postTodo = (data: TodoReqData) => postTodo(data);
}